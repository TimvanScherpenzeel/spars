// Scheduler
import { LinkedList } from './LinkedList';
import { PriorityUniqueQueue } from './PriorityUniqueQueue';

class TaskScheduler {
  public PRIORITY_LOWER: number = 1;
  public PRIORITY_LOW: number = 3;
  public PRIORITY_NORMAL: number = 5;
  public PRIORITY_HIGH: number = 7;
  public PRIORITY_IMPORTANT: number = 10;

  private lifeFrame: number;
  private heapJobs: PriorityUniqueQueue<LinkedList> = new PriorityUniqueQueue();
  private deferScheduled: boolean = false;

  constructor(lifeFrame: number = 16) {
    this.lifeFrame = lifeFrame;
  }

  public runDefer(): void {
    if (!this.deferScheduled) {
      this.deferScheduled = true;
      window.requestAnimationFrame(this.runJobs);
    }
  }

  public addJob = (callback: () => void, priority: number): void => {
    let job = this.heapJobs.get(priority);

    if (!job) {
      job = new LinkedList();
      this.heapJobs.add(priority, job);
    }

    job.push(callback);
  };

  private runJobs(): void {
    const timeRun = Date.now();

    while (true) {
      if (this.heapJobs.isEmpty() || Date.now() - timeRun > this.lifeFrame) {
        break;
      } else {
        const jobs = this.heapJobs.peek();

        try {
          jobs.shift()();
        } catch (e) {
          console.error(e); // tslint:disable-line
        }

        if (jobs.isEmpty()) {
          this.heapJobs.poll();
        }
      }
    }

    this.deferScheduled = false;

    if (!this.heapJobs.isEmpty()) {
      this.heapJobs.rising();

      this.runDefer();
    }
  }
}

export const scheduleTask = new TaskScheduler();
