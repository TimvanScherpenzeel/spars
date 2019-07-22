// Features
import getBrowserType from '../../features/browserFeatures/getBrowserType';

// Sensors
import { ComplementaryFilter } from './ComplementaryFilter';
import { Quaternion, Vector3 } from './math';
import { PosePredictor } from './PosePredictor';
import { isLandscapeMode, MAX_TIMESTEP, MIN_TIMESTEP } from './utilities';

export class FusionPoseSensor {
  private accelerometer = new Vector3();
  private gyroscope = new Vector3();

  private filter: ComplementaryFilter;
  private posePredictor: PosePredictor;
  private filterToWorldQuaternion: Quaternion = new Quaternion();
  private inverseWorldToScreenQuaternion: Quaternion = new Quaternion();
  private worldToScreenQuaternion: Quaternion = new Quaternion();
  private originalPoseAdjustQuaternion: Quaternion = new Quaternion();
  private resetQuaternion: Quaternion = new Quaternion();
  private orientationOutput: Float32Array = new Float32Array(4);
  private previousTimestamp: number = 0;

  private isDeviceMotionInRadians: boolean = false;

  constructor(kFilter: number, predictionTime: number) {
    this.filter = new ComplementaryFilter(kFilter);
    this.posePredictor = new PosePredictor(predictionTime);

    const chromeVersion = getBrowserType.isChrome && parseInt(getBrowserType.browserVersion, 10);
    this.isDeviceMotionInRadians = !getBrowserType.isiOS && chromeVersion && chromeVersion < 66;

    if (getBrowserType.isiOS) {
      this.filterToWorldQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), Math.PI / 2);
    } else {
      this.filterToWorldQuaternion.setFromAxisAngle(new Vector3(1, 0, 0), -Math.PI / 2);
    }

    this.originalPoseAdjustQuaternion.setFromAxisAngle(
      new Vector3(0, 0, 1),
      (-window.orientation * Math.PI) / 180
    );

    this.setScreenTransform();

    if (isLandscapeMode()) {
      this.filterToWorldQuaternion.multiply(this.inverseWorldToScreenQuaternion);
    }

    this.start();
  }

  public getOrientation(): Float32Array {
    const filterOrientation = this.filter.getOrientation();
    const orientation = this.posePredictor.getPrediction(
      filterOrientation,
      this.gyroscope,
      this.previousTimestamp
    );

    // Convert to THREE coordinate system: -Z forward, Y up, X right.
    const outputQuaternion = new Quaternion();
    outputQuaternion.copy(this.filterToWorldQuaternion);
    outputQuaternion.multiply(this.resetQuaternion);
    outputQuaternion.multiply(orientation);
    outputQuaternion.multiply(this.worldToScreenQuaternion);

    this.orientationOutput[0] = outputQuaternion.x;
    this.orientationOutput[1] = outputQuaternion.y;
    this.orientationOutput[2] = outputQuaternion.z;
    this.orientationOutput[3] = outputQuaternion.w;

    return this.orientationOutput;
  }

  public resetPose(): void {
    this.resetQuaternion.copy(this.filter.getOrientation());
    this.resetQuaternion.x = 0;
    this.resetQuaternion.y = 0;
    this.resetQuaternion.z *= -1;
    this.resetQuaternion.normalize();

    if (isLandscapeMode()) {
      this.resetQuaternion.multiply(this.inverseWorldToScreenQuaternion);
    }

    this.resetQuaternion.multiply(this.originalPoseAdjustQuaternion);
  }

  public onDeviceMotionChangeHandler(event: DeviceMotionEvent): void {
    this.updateDeviceMotion(event);
  }

  public updateDeviceMotion(event: DeviceMotionEvent): void {
    const accelerationIncludingGravity = event.accelerationIncludingGravity;
    const rotationRate = event.rotationRate;
    const timestamp = event.timeStamp / 1000;
    const deltaT = timestamp - this.previousTimestamp;

    // On Firefox/iOS the `timeStamp` properties can come in out of order.
    // so emit a warning about it and then stop.
    // The rotation still ends up working.
    if (deltaT < 0 || deltaT <= MIN_TIMESTEP || deltaT > MAX_TIMESTEP) {
      this.previousTimestamp = timestamp;
      return;
    }

    this.accelerometer.set(
      -accelerationIncludingGravity.x,
      -accelerationIncludingGravity.y,
      -accelerationIncludingGravity.z
    );
    this.gyroscope.set(rotationRate.alpha, rotationRate.beta, rotationRate.gamma);

    if (!this.isDeviceMotionInRadians) {
      this.gyroscope.multiplyScalar(Math.PI / 180);
    }

    this.filter.addAccelerometerMeasurement(this.accelerometer, timestamp);
    this.filter.addGyroscopeMeasurement(this.gyroscope, timestamp);

    this.previousTimestamp = timestamp;
  }

  public onOrientationChangeHandler(): void {
    this.setScreenTransform();
  }

  public setScreenTransform(): void {
    this.worldToScreenQuaternion.set(0, 0, 0, 1);

    switch (window.orientation) {
      case 0:
        break;
      case 90:
        this.worldToScreenQuaternion.setFromAxisAngle(new Vector3(0, 0, 1), -Math.PI / 2);
        break;
      case -90:
        this.worldToScreenQuaternion.setFromAxisAngle(new Vector3(0, 0, 1), Math.PI / 2);
        break;
      case 180:
        break;
    }

    this.inverseWorldToScreenQuaternion.copy(this.worldToScreenQuaternion);
    this.inverseWorldToScreenQuaternion.inverse();
  }

  public start(): void {
    window.addEventListener('orientationchange', this.onOrientationChangeHandler, false);
    window.addEventListener('devicemotion', this.onDeviceMotionChangeHandler, false);
  }

  public stop(): void {
    window.removeEventListener('orientationchange', this.onOrientationChangeHandler, false);
    window.removeEventListener('devicemotion', this.onDeviceMotionChangeHandler, false);
  }
}
