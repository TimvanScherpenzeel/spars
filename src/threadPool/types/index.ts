/**
 * Definitions of the task state
 */
export type TTaskState = 'cancelled' | 'completed' | 'fulfilled' | 'pending' | 'scheduled';

/**
 * Extended worker interface, used internally
 */
export interface IThread extends Worker {
  id: string;
  isPending: number;
  ready: any;
  call: any;
  url: string;
}
