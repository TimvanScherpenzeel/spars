export interface IQueueItem<T> {
  priority: number;
  value: T;
}
