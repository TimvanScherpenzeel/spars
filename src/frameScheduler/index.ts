/**
 * Inspired by https://github.com/Tom910/frame-scheduling
 */

// FrameScheduler
import { PriorityUniqueQueue } from './PriorityUniqueQueue';
import { SinglyLinkedList } from './SinglyLinkedList';

const TIME_LIFE_FRAME = 16.6667;

export const schedulePriorities = {
  LOWER: 1,
  // tslint:disable-next-line:object-literal-sort-keys
  LOW: 3,
  NORMAL: 5,
  HIGH: 7,
  IMPORTANT: 10,
};

/**
 * Create a new frame scheduler
 *
 * A frame scheduler schedules a limited amount of tasks each frame in order to keep a consistent 60 frames per second
 * If a task is expected to not fit in a single frame it is transferred to the next frame
 */
export const createFrameScheduler = (): (() => void) => {
  const heapTasks = new PriorityUniqueQueue<SinglyLinkedList>();
  let deferScheduled = false;

  const runDefer = (): void => {
    if (!deferScheduled) {
      deferScheduled = true;
      window.requestAnimationFrame(runTasks);
    }
  };

  /**
   * Add a task to the scheduler
   *
   * @param callback Task to run
   * @param priority Priority of the task
   */
  const addTask = (callback: () => void, priority: number): void => {
    let task = heapTasks.get(priority);

    if (!task) {
      task = new SinglyLinkedList();
      heapTasks.add(priority, task);
    }

    task.push(callback);
  };

  /**
   * Start the frame scheduler and run the tasks
   */
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

  /**
   * Add a task to the scheduler
   */
  // TODO: fix definition
  // @ts-ignore
  return function scheduling(
    callback: () => void,
    // TODO: fix definition
    // @ts-ignore
    { priority = schedulePriorities.NORMAL } = {}
  ): void {
    addTask(callback, priority);

    runDefer();
  };
};

export const scheduleFrame = createFrameScheduler();
