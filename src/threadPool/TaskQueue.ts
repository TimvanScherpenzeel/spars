// ThreadPool
import { config } from './config';
import { Task } from './Task';
import { TaskManager } from './TaskManager';

export class TaskQueue {
  public $$TASK_MANAGER!: TaskManager;

  constructor(size: number = config.THREAD_POOL_SIZE) {
    Object.defineProperty(this, '$$TASK_MANAGER', {
      configurable: true,
      value: new TaskManager(size),
    });
  }

  public run(taskName: string, ...args: Parameters<any>): Task {
    const task = new Task();
    task.id = config.ID_COUNT++;
    this.$$TASK_MANAGER.exec(task, taskName, args);

    Object.defineProperty(task, '$$TASK_QUEUE', {
      value: this,
    });

    return task;
  }

  public add(moduleName: string, moduleClass: string): Promise<Task[]> {
    return Promise.resolve(
      this.$$TASK_MANAGER.addWorklet(`registerTask('${moduleName}', class { ${moduleClass} })`)
    );
  }

  public dispose(): void {
    for (const worker of this.$$TASK_MANAGER.workers) {
      worker.terminate();
      URL.revokeObjectURL(worker.url);
    }

    Object.defineProperty(this, '$$TASK_MANAGER', { value: null });
  }
}
