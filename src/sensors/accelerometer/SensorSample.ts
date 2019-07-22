// Sensors
import { Vector3 } from './math';

export class SensorSample {
  public sample!: Vector3;
  public timestamp!: number;

  constructor(sample: Vector3 = new Vector3(), timestamp: number = 0) {
    this.set(sample, timestamp);
  }

  public set(sample: Vector3, timestamp: number): void {
    this.sample = sample;
    this.timestamp = timestamp;
  }

  public copy(sensorSample: SensorSample): void {
    this.set(sensorSample.sample, sensorSample.timestamp);
  }
}
