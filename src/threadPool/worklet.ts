// ThreadPool
import { Task } from './Task';

// Types
import { Self } from './types/native';

export const worklet = URL.createObjectURL(
  new Blob([
    `(${(): void => {
      function realm(code: string, scope: any): Self {
        scope.eval = (self as any).eval;
        scope.self = scope;
        const keys = Object.keys(scope);

        return (self as any)
          .eval(`(function(${keys},scope,code,keys,realm){\n${code}\n})`)
          .apply(scope, keys.map(k => scope[k]));
      }

      ((): void => {
        let UNIQUE_ID: string;

        const queue: any[] = [];
        const results: any = {};
        const tasks: any = {};
        const instances: any = {};
        const cancellations: any = {};
        const gotResults: any[] = [];

        function walkReduce(
          obj: any,
          reducer: any,
          accumulator?: any,
          index?: any,
          parent?: any
        ): any {
          const f = reducer(accumulator, obj, index, parent);

          if (f !== undefined) {
            accumulator = f;
          }

          if (typeof obj === 'object' && obj) {
            // tslint:disable-next-line:forin
            for (const i in obj) {
              walkReduce(obj[i], reducer, accumulator, i, obj);
            }
          }

          return accumulator;
        }

        function walk(obj: any[], action: (value: Task, i: string, obj: any[]) => void): void {
          const SENTINEL = `${UNIQUE_ID}:`;

          // tslint:disable-next-line:no-shadowed-variable
          walkReduce(obj, (acc: any, value: any, i: string, obj: any[]) => {
            if (
              typeof value === 'object' &&
              value &&
              '$$TASK_IDENTIFIER' in value &&
              value.$$TASK_IDENTIFIER === `${SENTINEL}${value.id}`
            ) {
              action(value, i, obj);
            }
          });
        }

        function collectTransferrables(transfer: any[], value: any): void {
          if (
            value instanceof ArrayBuffer ||
            value instanceof MessagePort ||
            (self.createImageBitmap && value instanceof ImageBitmap)
          ) {
            transfer.push(value);
          }
        }

        function countPendingTasks(task: Task, property: string, obj: any[]): void {
          if ('$$TASK_RESULT' in task) {
            return;
          }

          const result = results[(task as any).id];

          if (result == null || !result.isFulfilled) {
            pendingTasks++;
          }
        }

        function replaceTaskIdWithResult(task: Task, property: any, obj: any): void {
          let value;

          if ('$$TASK_RESULT' in task) {
            value = task.$$TASK_RESULT;
          } else {
            const result = results[(task as any).id];
            value = result.error || result.value;
          }

          obj[property] = value;
        }

        // Promise status resolvers
        const RESOLVE = 0;
        const REJECT = 1;

        // Strings less than this length can be inlined into high priority
        // result listings
        const SMALL_STRING_MAX = 512;

        // For task options bitmask
        const RETURN_RESULT = 1;

        const resolved = Promise.resolve();
        let pendingTasks = 0;
        let flushTimer: NodeJS.Timeout;

        function next(): void {
          clearTimeout(flushTimer);

          if (queue.length === 0) {
            flushTimer = setTimeout(flushResultStatuses, 50);
            return;
          }

          let taskDescription;

          for (let i = 0; i < queue.length; i++) {
            pendingTasks = 0;

            walk(queue[i], countPendingTasks);

            if (pendingTasks === 0) {
              taskDescription = queue[i];
              queue.splice(i, 1);
              break;
            }
          }

          // Queue has tasks, but all are pending
          if (taskDescription == null) {
            console.error(
              `ThreadPool -> Queue deadlocked: all ${queue.length} tasks have unresolved dependencies.`
            );

            // This is dead time, flush any pending results
            flushResultStatuses();

            return;
          }

          const id = taskDescription[0];
          const options = taskDescription[1];
          const name = taskDescription[2];
          const args = taskDescription.slice(3);

          walk(args, replaceTaskIdWithResult);

          delete cancellations[id];

          const $$TASK_PROCESSOR = tasks[name];

          const result: any = (results[id] = resolved
            .then(() => {
              if (typeof $$TASK_PROCESSOR !== 'function') {
                throw new Error(`ThreadPool -> Unknown task processor "${name}".`);
              }

              const instance = instances[name] || (instances[name] = new $$TASK_PROCESSOR());

              return instance.process(...args);
            })
            .then(
              value => {
                result.state = RESOLVE;
                result.isFulfilled = true;
                result.value = value;

                gotResults.push([id, options, RESOLVE, value]);

                next();
              },
              err => {
                result.state = REJECT;
                result.isFulfilled = true;
                result.error = err;

                gotResults.push([id, options, REJECT, `${err}`]);

                next();
              }
            ));
        }

        function flushResultStatuses(): void {
          clearTimeout(flushTimer);

          if (gotResults.length === 0) {
            return;
          }

          const transferrables: any[] = [];
          let statuses: any[] = [];
          const returnStatuses: any[] = [];
          let priorityResultCount: number = 0;
          let resultCount: number = 0;

          for (let i = 0; i < gotResults.length; i++) {
            if (gotResults[i] == null) {
              continue;
            }

            resultCount++;

            const [id, options, state, data] = gotResults[i];
            const status = [id, state];

            // If requested, we'll return the result along with the status:
            const returnResult = options & RETURN_RESULT;

            // If there are any priority returns in the queue, drop low-priority returns as we switch modes:
            if (returnResult) {
              priorityResultCount++;
            }

            // Preemptively pass nearly-free result types to the coordinating thread.
            const transferrablesBefore = transferrables.length;

            if (data) {
              walkReduce(data, collectTransferrables, transferrables);
            }

            const hasTransferrables = transferrables.length > transferrablesBefore;

            if (
              returnResult ||
              data == null ||
              hasTransferrables ||
              typeof data === 'boolean' ||
              typeof data === 'number' ||
              (typeof data === 'string' && data.length < SMALL_STRING_MAX)
            ) {
              status.push(data);
              returnStatuses.push(status);
              gotResults[i] = null;
            }

            statuses.push(status);
          }

          if (priorityResultCount !== 0) {
            statuses = returnStatuses;
          }

          // Low-priority / normal return clears the entire queue
          if (resultCount === 0 || statuses.length === resultCount) {
            gotResults.length = 0;
          } else {
            flushTimer = setTimeout(flushResultStatuses, 50);
          }

          if (statuses.length !== 0) {
            // @ts-ignore postMessage lists the second argument as origin but it is actually not
            postMessage(['status', 0, statuses], transferrables);
          }
        }

        const API = {
          $$init(identifier: string, worklets: string[]): Promise<any[]> {
            UNIQUE_ID = identifier;

            return Promise.all((worklets || []).map(API.$$eval));
          },

          $$eval(code: string): Promise<any[]> {
            const descriptions: any = {};
            const waitFor: any[] = [];
            const scope = {
              $$TASK_WORKLET_WAIT(promise: Promise<any>): void {
                waitFor.push(promise);
              },

              registerTask(name: string, taskProcessor: () => void): void {
                tasks[name] = taskProcessor;
                descriptions[name] = Object.assign({}, taskProcessor);
              },
            };

            realm(code, scope);

            return Promise.all(waitFor).then(() => descriptions);
          },

          $$task(id: number): void {
            const data = [].slice.call(arguments);

            if (id in cancellations) {
              console.log(`Skipping cancelled task: ${id}`);
              return;
            }

            if (queue.push(data) === 1) {
              next();
            }
          },

          $$getResult(id: number): void {
            for (let i = gotResults.length; i--; ) {
              if (gotResults[i][0] === id) {
                gotResults.splice(i, 1);
                break;
              }
            }

            if ((!id as any) in results) {
              throw new Error(`ThreadPool -> Result ${id} not found.`);
            }

            const result = results[id];

            gotResults.push([id, RETURN_RESULT, result.state, result.value]);

            flushResultStatuses();
          },

          $$cancel(id: number): void {
            cancellations[id] = true;
          },
        };

        addEventListener('message', ({ data }) => {
          let index = -1;

          // tslint:disable-next-line:no-shadowed-variable
          function next(): void {
            if (++index === data.length) {
              return;
            }

            const item: any[] = data[index];

            resolved
              .then(() => (API as any)[item[0]].apply(null, item.slice(2)))
              .then(
                result => {
                  if (result !== undefined) {
                    // @ts-ignore postMessage expects 2-3 arguments but got 1 (correct)
                    postMessage([0, item[1], result]);
                  }

                  next();
                },
                err => {
                  // @ts-ignore postMessage expects 2-3 arguments but got 1 (correct)
                  postMessage([1, item[1], `${err}`]);
                }
              );
          }

          next();
        });
      })();
    }})()`,
  ])
);
