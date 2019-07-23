// Scheduler
import { LinkedList } from './LinkedList';
import { PriorityUniqueQueue } from './PriorityUniqueQueue';

const TIME_LIFE_FRAME = 16;

export const TASK_PRIORITY = {
  LOWER: 1,
  // tslint:disable-next-line:object-literal-sort-keys
  LOW: 3,
  NORMAL: 5,
  HIGH: 7,
  IMPORTANT: 10,
};

export const createFrameScheduling = (): any => {
  const heapJobs = new PriorityUniqueQueue<LinkedList>();
  let deferScheduled = false;

  const runDefer = (): void => {
    if (!deferScheduled) {
      deferScheduled = true;
      window.requestAnimationFrame(runJobs);
    }
  };

  const addJob = (callback: () => void, priority: number): void => {
    let job = heapJobs.get(priority);

    if (!job) {
      job = new LinkedList();
      heapJobs.add(priority, job);
    }

    job.push(callback);
  };

  const runJobs = (): void => {
    const timeRun = Date.now();

    while (true) {
      if (heapJobs.isEmpty() || Date.now() - timeRun > TIME_LIFE_FRAME) {
        break;
      } else {
        const jobs = heapJobs.peek();

        try {
          jobs.shift()();
        } catch (err) {
          console.error(err);
        }

        if (jobs.isEmpty()) {
          heapJobs.poll();
        }
      }
    }

    deferScheduled = false;

    if (!heapJobs.isEmpty()) {
      heapJobs.rising();

      runDefer();
    }
  };

  // @ts-ignore
  return function scheduling(callback: () => void, { priority = TASK_PRIORITY.NORMAL } = {}): void {
    addJob(callback, priority);

    runDefer();
  };
};

export default createFrameScheduling();
