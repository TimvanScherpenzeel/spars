// Types
import { TTaskState } from './types';

export class Task {
  public id!: number;
  public state: TTaskState = 'pending';
  public result!: any;

  public $$TASK_RESULT!: any;
  public $$TASK_IDENTIFIER!: string;
}

Object.defineProperties(Task.prototype, {
  $$TASK_IDENTIFIER: {
    configurable: false,
    enumerable: true,
    value: undefined,
    writable: true,
  },

  state: {
    value: 'pending',
    writable: true,
  },

  get: {
    get(): () => Promise<any> {
      let result = this.$$RESULT;

      if (!result) {
        Object.defineProperty(this, '$$RESULT', {
          value: result = this.$$TASK_QUEUE.$$TASK_MANAGER.getTaskResult(this.id),
        });
      }

      return (): any => result;
    },
  },

  cancel: {
    value(): void {
      this.$$TASK_QUEUE.$$TASK_MANAGER.cancelTask(this.id);
    },
  },
});
