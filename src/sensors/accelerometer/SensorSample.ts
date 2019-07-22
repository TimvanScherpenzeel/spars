import { Vector3 } from './math';

export class SensorSample {
  public sample: Vector3;
  public timestamp: number;

  constructor(sample?: Vector3, timestamp?: number) {
    this.set(sample, timestamp);
  }

  public set(sample, timestamp): void {
    this.sample = sample;
    this.timestamp = timestamp;
  }

  public copy(sensorSample: SensorSample): void {
    this.set(sensorSample.sample, sensorSample.timestamp);
  }
}
