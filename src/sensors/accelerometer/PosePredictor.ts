// Math
import { degreesToRadians, Quaternion, Vector3 } from './math';

// Types
import { TNullable } from '../../types';

export class PosePredictor {
  public predictionTime: number;

  private previousQuaternion: Quaternion = new Quaternion();
  private deltaQuaternion: Quaternion = new Quaternion();
  private outputQuaternion: Quaternion = new Quaternion();
  private previousTimestamp: TNullable<number> = null;

  constructor(predictionTime: number) {
    this.predictionTime = predictionTime;
  }

  public getPrediction(
    currentQuaternion: Quaternion,
    currentVector: Vector3,
    timestamp: number
  ): Quaternion {
    if (!this.previousTimestamp) {
      this.previousQuaternion.copy(currentQuaternion);
      this.previousTimestamp = timestamp;

      return currentQuaternion;
    }

    const axis = new Vector3();
    axis.copy(currentVector);
    axis.normalize();

    const angularSpeed = currentVector.length();

    // If rotating slowly, avoid predicting
    if (angularSpeed < degreesToRadians * 20) {
      this.outputQuaternion.copy(currentQuaternion);
      this.previousQuaternion.copy(currentQuaternion);

      return this.outputQuaternion;
    }

    // Get the predicted angle based on the time delta and latency
    const deltaT = timestamp - this.previousTimestamp;
    const predictedAngle = angularSpeed * this.predictionTime;

    this.deltaQuaternion.setFromAxisAngle(axis, predictedAngle);
    this.outputQuaternion.copy(this.previousQuaternion);
    this.outputQuaternion.multiply(this.deltaQuaternion);

    this.previousQuaternion.copy(currentQuaternion);
    this.previousTimestamp = timestamp;

    return this.outputQuaternion;
  }
}
