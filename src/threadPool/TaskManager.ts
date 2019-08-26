// ThreadPool
import { config } from './config';
import { Task } from './Task';
import { worklet } from './worklet';

// Utilities
import { assert } from '../utilities';

// Types
import { TVoidable } from '../types';
import { IThread } from './types';

/**
 * Manage the task queue and interact with the RPC's
 */
export class TaskManager {
  private static walkTaskArgs = (
    obj: any[],
    walker: (value: Task, i: string, obj: any[]) => void
  ): void => {
    // tslint:disable-next-line:forin
    for (const i in obj) {
      const value = obj[i];

      if (typeof value === 'object' && value) {
        if (value instanceof Task) {
          walker(value, i, obj);
        }
      }
    }
  };

  public workers: IThread[] = [];

  private size: number;
  private worklets: string[] = [];
  private tasks: { [id: number]: Task } = {};
  private results: { [id: number]: any } = {};
  private workerTaskAssignments: { [id: number]: any } = {};

  /**
   * Sets various configuration options
   *
   * @param size Maximum amount of threads to use
   */
  constructor(size?: number) {
    this.size = size || config.THREAD_POOL_SIZE;
  }

  /**
   * Execute a task
   *
   * @param task Task to execute
   * @param taskName Name of the task to execute
   * @param args Any arguments that have been passed along with the task (including dependencies)
   */
  public exec(task: Task, taskName: string, args: any): void {
    const worker = this.getTaskWorker(taskName, args) || this.getNextWorker();
    this.workerTaskAssignments[task.id] = worker.id;
    this.tasks[task.id] = task;
    task.state = 'scheduled';
    worker.isPending++;

    const resultController: any = (this.results[task.id] = {
      isCancelled: false, // Has the task been cancelled?
      isCompleted: false, // Has the task been marked as completed by its worker?
      isFulfilled: false, // Has the task result been obtained from the worker?
      isPending: true, // Is the task waiting to be sent to a worker?
      isRequested: false, // Has the task result been requested from the worker?
    });

    resultController.result = new Promise((resolve, reject): void => {
      resultController[0] = resolve;
      resultController[1] = reject;
    });

    const tasksToResolveIndices: any[] = [];
    const tasksToResolve: Array<Promise<any>> = [];
    const tasks: Task[] = [];

    // TODO: it would be better to serialize tasks to their $$TASK_IDENTIFIER
    // String representation here. However doing so cannot mutate args in-place,
    // as it would reveal the identifier secret.
    TaskManager.walkTaskArgs(args, (value: any) => {
      if (this.getWorkerForTask(value.id) !== worker) {
        const controller = this.results[value.id];

        console.warn(
          `ThreadPool -> Task#${value.id} passed to ${taskName}[${
            task.id
          }] was invoked in a different context. The result will be ${
            controller.isFulfilled ? '' : 'materialized & '
          }transferred.`
        );

        tasksToResolveIndices.push(tasks.length);
        tasksToResolve.push(controller.result);
      }

      tasks.push(value);
    });

    // also wait for the worker to be loaded (async module resolution, etc)
    tasksToResolve.push(worker.ready);

    Promise.all(tasksToResolve)
      .then(taskValues => {
        resultController.isPending = false;

        if (resultController.isCancelled) {
          return;
        }

        for (let i = tasks.length; i--; ) {
          const activeTask = tasks[i];
          activeTask.$$TASK_IDENTIFIER = `${config.UNIQUE_ID}:${activeTask.id}`;
        }

        for (let i = tasksToResolveIndices.length; i--; ) {
          const activeTask = tasks[tasksToResolveIndices[i]];
          activeTask.$$TASK_RESULT = taskValues[i];
        }

        let options = 0;

        // If we need a result right away, mark the task as requiring a return
        // value. This handles common cases like `await casket.addTask().result`.
        if (resultController.isRequested) {
          options |= 1;
        }

        worker.call('$$task', [task.id, options, taskName].concat(args));
      })
      .then(() => {
        for (const activeTask of tasks) {
          delete activeTask.$$TASK_IDENTIFIER;
          delete activeTask.$$TASK_RESULT;
        }
      });
  }

  /**
   * Add a compute module to the task pool
   *
   * @param code Compute module source code
   */
  public addWorklet(code: string): Promise<Task[]> {
    this.worklets.push(code);

    return Promise.all(this.workers.map(worker => worker.call('$$eval', [code])));
  }

  /**
   * Cancel a task
   *
   * Cancellation isn't guaranteed, however cancellation of a task
   * known to have been already completed will return `false`.
   *
   * @param taskId Id of task to cancel
   */
  public cancelTask(taskId: any): TVoidable<boolean> {
    const task: any = this.tasks[taskId];
    const resultController = this.results[taskId];

    if (resultController.isCompleted || task.state === 'completed') {
      return false;
    }

    task.state = 'cancelled';
    resultController.isCancelled = true;

    if (!resultController.isPending) {
      const workerId = this.workerTaskAssignments[taskId];
      const worker = this.getWorker(workerId);

      if (worker) {
        worker.call('$$cancel', [taskId]);
      }
    }
  }

  /**
   * Get a task result
   *
   * @param taskId Id of task to get result of
   */
  public getTaskResult(taskId: any): any {
    const resultController = this.results[taskId];

    assert(resultController, `ThreadPool -> Unknown result for Task: ${taskId}`);

    if (resultController.isPending === true) {
      resultController.isRequested = true;
    } else if (resultController.isFulfilled === false && resultController.isRequested === false) {
      resultController.isRequested = true;

      const workerId = this.workerTaskAssignments[taskId];
      const worker = this.getWorker(workerId);

      if (worker) {
        worker.call('$$getResult', [taskId]);
      }
    }

    return resultController.result;
  }

  /**
   * Status of the thread (communicates with the individual thread)
   *
   * @param worker Active thread
   * @param statuses Any statusses to report
   */
  private statusReceived(worker: any, statuses: any): void {
    for (const status of statuses) {
      const id = status[0];
      const task = this.tasks[id];
      const resultController = this.results[id];

      if (task.state === 'scheduled') {
        const workerId = this.workerTaskAssignments[id];
        const scheduledWorker = this.getWorker(workerId);

        this.freeWorkerTask(scheduledWorker);
      }

      // current only a fulfillment triggers status updates, so we assume an
      // update fulfills its task:
      task.state = 'completed';
      resultController.isCompleted = true;

      // [id,status,data] denotes a task with an eager return value
      // (forced | numbers | booleans):
      if (status.length === 3 && status[2]) {
        task.state = 'fulfilled';
        // resolve | reject the status
        resultController.isFulfilled = true;
        resultController[status[1]](status[2]);
      }
    }
  }

  /**
   * Mark a thread as free for new computation
   *
   * @param worker Thread to mark as free
   */
  private freeWorkerTask(worker: any): void {
    if (--worker.isPending === 0) {
      // TODO: the worker now has no pending tasks.
      // Should we reallocate any pending idempotent tasks from other workers in
      // the pool? This may be impossible since tasks are scheduled by we don't
      // know their instantaneous queuing status at any given point in time.
    }
  }

  /**
   * Get an active thread by id
   *
   * @param id Id of the thread to get
   */
  private getWorker(id: any): TVoidable<IThread> {
    for (const worker of this.workers) {
      if (worker.id === id) {
        return worker;
      }
    }
  }

  /**
   * Add a thread to the thread pool
   */
  private addWorker(): IThread {
    const worker: any = new Worker(worklet);
    worker.url = worklet;
    worker.id = config.ID_COUNT++;
    worker.isPending = 0;
    const callbacks: any = {};

    worker.onmessage = (event: MessageEvent): any => {
      const [type, id, data] = event.data;
      const typeReceived = `${type}Received`;

      if ((this as any)[typeReceived]) {
        return (this as any)[typeReceived](worker, data);
      }

      callbacks[id][type](data);

      delete callbacks[id];
    };

    let casket: any[] = [];
    const resolved = Promise.resolve();

    function process(): void {
      worker.postMessage(casket);
      casket = [];
    }

    worker.call = (method: string, params: any[]): Promise<void> =>
      // tslint:disable-next-line:only-arrow-functions
      new Promise(function(): void {
        const id = config.ID_COUNT++;
        callbacks[id] = arguments;

        if (casket.push([method, id].concat(params)) === 1) {
          resolved.then(process);
        }
      });

    this.workers.push(worker);
    worker.ready = worker.call('$$init', [config.UNIQUE_ID, this.worklets]);

    return worker;
  }

  /**
   * Get the most suitable worker for this task (keep dependencies in mind)
   *
   * @param taskId Id of the task
   */
  private getWorkerForTask(taskId: number): TVoidable<IThread> {
    const workerId = this.workerTaskAssignments[taskId];

    for (const worker of this.workers) {
      if (worker.id === workerId) {
        return worker;
      }
    }
  }

  /**
   * Get and collect any dependencies of a task
   *
   * @param args Task dependencies
   */
  private getTaskDependencies(args: any[]): Task[] {
    const tasks: Task[] = [];

    TaskManager.walkTaskArgs(args, (task: Task) => {
      tasks.push(task);
    });

    return tasks;
  }

  /**
   * Get the most suitable worker for this task (keep dependencies in mind)
   *
   * @param taskName Name of the task
   * @param args Any arguments that have been passed along with the task (including dependencies)
   */
  private getTaskWorker(taskName: string, args: any[]): TVoidable<IThread> {
    const tasks = this.getTaskDependencies(args);
    const usage: any = {};
    let highest = 0;
    let bestWorkerId = null;

    for (const task of tasks) {
      const workerId = this.workerTaskAssignments[task.id];
      const current = (usage[workerId] = (usage[workerId] || 0) + 1);

      if (current > highest) {
        highest = current;
        bestWorkerId = workerId;
      }
    }

    if (bestWorkerId !== null) {
      return this.getWorker(bestWorkerId);
    }
  }

  /**
   * If no suitable worker for the task was found get the next available one
   */
  private getNextWorker(): IThread {
    const size = this.workers.length;

    if (size === 0) {
      return this.addWorker();
    }

    let bestWorker = this.workers[0];

    for (let i = 1; i < size; i++) {
      const worker = this.workers[i];

      if (worker.isPending < bestWorker.isPending) {
        bestWorker = worker;
      }
    }

    if (bestWorker.isPending && size < this.size) {
      return this.addWorker();
    }

    return bestWorker;
  }
}
