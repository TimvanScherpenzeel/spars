/**
 * Inspired by https://github.com/Tom910/frame-scheduling
 */

// FrameScheduler
import { LinkedList } from './LinkedList';
import { PriorityUniqueQueue } from './PriorityUniqueQueue';

const TIME_LIFE_FRAME = 16.67;

export const priorities = {
  LOWER: 1,
  // tslint:disable-next-line:object-literal-sort-keys
  LOW: 3,
  NORMAL: 5,
  HIGH: 7,
  IMPORTANT: 10,
};

export const createFrameScheduler = (): (() => void) => {
  const heapTasks = new PriorityUniqueQueue<LinkedList>();
  let deferScheduled = false;

  const runDefer = (): void => {
    if (!deferScheduled) {
      deferScheduled = true;
      window.requestAnimationFrame(runTasks);
    }
  };

  const addTask = (callback: () => void, priority: number): void => {
    let task = heapTasks.get(priority);

    if (!task) {
      task = new LinkedList();
      heapTasks.add(priority, task);
    }

    task.push(callback);
  };

  const runTasks = (): void => {
    const timeRan = performance.now();

    while (true) {
      if (heapTasks.isEmpty() || performance.now() - timeRan > TIME_LIFE_FRAME) {
        break;
      } else {
        const tasks = heapTasks.peek();

        try {
          tasks.shift()();
        } catch (err) {
          console.error(err);
        }

        if (tasks.isEmpty()) {
          heapTasks.poll();
        }
      }
    }

    deferScheduled = false;

    if (!heapTasks.isEmpty()) {
      heapTasks.rising();

      runDefer();
    }
  };

  // TODO: fix definition
  // @ts-ignore
  return function scheduling(callback: () => void, { priority = priorities.NORMAL } = {}): void {
    addTask(callback, priority);

    runDefer();
  };
};

export const scheduleFrame = createFrameScheduler();
