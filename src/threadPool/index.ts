/**
 * Inspired by https://github.com/developit/task-worklet
 */

// ThreadPool
import { config } from './config';
import { Task } from './Task';
import { TaskManager } from './TaskManager';

/**
 * Add tasks to a worker task queue
 */
export class TaskQueue {
  public $$TASK_MANAGER!: TaskManager;

  /**
   * Sets various configuration options
   *
   * @param size Maximum amount of threads to use
   */
  constructor(size: number = config.THREAD_POOL_SIZE) {
    Object.defineProperty(this, '$$TASK_MANAGER', {
      configurable: true,
      value: new TaskManager(size),
    });
  }

  /**
   * Run a task on a compute module from the task pool
   *
   * @param taskName Name of the compute module to execute in the task queue
   * @param args Any arguments to pass along with the task (including dependencies)
   */
  public run(taskName: string, ...args: Parameters<any>): Task {
    const task = new Task();
    task.id = config.ID_COUNT++;
    this.$$TASK_MANAGER.exec(task, taskName, args);

    Object.defineProperty(task, '$$TASK_QUEUE', {
      value: this,
    });

    return task;
  }

  /**
   * Add a compute module to the task pool
   *
   * @param moduleName Name of the compute module to make available to the task
   * @param moduleClass Compute module to make available to task
   */
  public add(moduleName: string, moduleClass: string): Promise<Task[]> {
    return Promise.resolve(this.$$TASK_MANAGER.addWorklet(`registerTask('${moduleName}', class { ${moduleClass} })`));
  }

  /**
   * Dispose all active threads
   */
  public dispose(): void {
    for (const worker of this.$$TASK_MANAGER.workers) {
      worker.terminate();
      URL.revokeObjectURL(worker.url);
    }

    Object.defineProperty(this, '$$TASK_MANAGER', { value: null });
  }
}

export const threadPool = new TaskQueue();
