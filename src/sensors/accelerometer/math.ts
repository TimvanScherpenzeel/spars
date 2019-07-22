// Vector3
// Quaternion

export const degreesToRadians = Math.PI / 180;
export const radiansToDegrees = 180 / Math.PI;

export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public set(x: number, y: number, z: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  public copy(vector: Vector3): void {
    this.x = vector.x;
    this.y = vector.y;
    this.z = vector.z;
  }

  public length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  public normalize(): void {
    const scalar = this.length();

    if (scalar !== 0) {
      const inverseScalar = 1 / scalar;

      this.multiplyScalar(inverseScalar);
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }
  }

  public multiplyScalar(scalar: number): void {
    this.x *= scalar;
    this.y *= scalar;
    this.z *= scalar;
  }

  public applyQuaternion(q): void {
    const x = this.x;
    const y = this.y;
    const z = this.z;

    const qx = q.x;
    const qy = q.y;
    const qz = q.z;
    const qw = q.w;

    // calculate quat * vector
    const ix = qw * x + qy * z - qz * y;
    const iy = qw * y + qz * x - qx * z;
    const iz = qw * z + qx * y - qy * x;
    const iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;
  }

  public dot(vector: Vector3): number {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  public crossVectors(vectorA: Vector3, vectorB: Vector3): void {
    const ax = vectorA.x;
    const ay = vectorA.y;
    const az = vectorA.z;
    const bx = vectorB.x;
    const by = vectorB.y;
    const bz = vectorB.z;

    this.x = ay * bz - az * by;
    this.y = az * bx - ax * bz;
    this.z = ax * by - ay * bx;
  }
}

const TMP_VECTOR3 = new Vector3();

// tslint:disable-next-line:max-classes-per-file
export class Quaternion {
  public x: number;
  public y: number;
  public z: number;
  public w: number;

  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 1) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  public set(x: number, y: number, z: number, w: number): void {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  public copy(quaternion: Quaternion): Quaternion {
    this.x = quaternion.x;
    this.y = quaternion.y;
    this.z = quaternion.z;
    this.w = quaternion.w;

    return this;
  }

  public setFromEulerXYZ(x: number, y: number, z: number): void {
    const c1 = Math.cos(x / 2);
    const c2 = Math.cos(y / 2);
    const c3 = Math.cos(z / 2);
    const s1 = Math.sin(x / 2);
    const s2 = Math.sin(y / 2);
    const s3 = Math.sin(z / 2);

    this.x = s1 * c2 * c3 + c1 * s2 * s3;
    this.y = c1 * s2 * c3 - s1 * c2 * s3;
    this.z = c1 * c2 * s3 + s1 * s2 * c3;
    this.w = c1 * c2 * c3 - s1 * s2 * s3;
  }

  public setFromEulerYXZ(x: number, y: number, z: number): void {
    const c1 = Math.cos(x / 2);
    const c2 = Math.cos(y / 2);
    const c3 = Math.cos(z / 2);
    const s1 = Math.sin(x / 2);
    const s2 = Math.sin(y / 2);
    const s3 = Math.sin(z / 2);

    this.x = s1 * c2 * c3 + c1 * s2 * s3;
    this.y = c1 * s2 * c3 - s1 * c2 * s3;
    this.z = c1 * c2 * s3 - s1 * s2 * c3;
    this.w = c1 * c2 * c3 + s1 * s2 * s3;
  }

  public setFromAxisAngle(axis, angle): void {
    // http://www.euclideanspace.com/maths/geometry/rotations/conversions/angleToQuaternion/index.htm
    // assumes axis is normalized

    const halfAngle = angle / 2;
    const scalar = Math.sin(halfAngle);

    this.x = axis.x * scalar;
    this.y = axis.y * scalar;
    this.z = axis.z * scalar;
    this.w = Math.cos(halfAngle);
  }

  public multiply(quaternion: Quaternion): void {
    return this.multiplyQuaternions(this, quaternion);
  }

  public multiplyQuaternions(quaternionA: Quaternion, quaternionB: Quaternion): void {
    // from http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/code/index.htm

    const qax = quaternionA.x;
    const qay = quaternionA.y;
    const qaz = quaternionA.z;
    const qaw = quaternionA.w;
    const qbx = quaternionB.x;
    const qby = quaternionB.y;
    const qbz = quaternionB.z;
    const qbw = quaternionB.w;

    this.x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
    this.y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
    this.z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
    this.w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;
  }

  public inverse(): void {
    this.x *= -1;
    this.y *= -1;
    this.z *= -1;

    this.normalize();
  }

  public normalize(): void {
    let length = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);

    if (length === 0) {
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.w = 1;
    } else {
      length = 1 / length;

      this.x = this.x * length;
      this.y = this.y * length;
      this.z = this.z * length;
      this.w = this.w * length;
    }
  }

  public slerp(quaternionB, time): Quaternion {
    if (time === 0) {
      return this;
    }

    if (time === 1) {
      return this.copy(quaternionB);
    }

    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;

    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/slerp/

    let cosHalfTheta =
      w * quaternionB.w + x * quaternionB.x + y * quaternionB.y + z * quaternionB.z;

    if (cosHalfTheta < 0) {
      this.w = -quaternionB.w;
      this.x = -quaternionB.x;
      this.y = -quaternionB.y;
      this.z = -quaternionB.z;

      cosHalfTheta = -cosHalfTheta;
    } else {
      this.copy(quaternionB);
    }

    if (cosHalfTheta >= 1.0) {
      this.w = w;
      this.x = x;
      this.y = y;
      this.z = z;
    }

    const halfTheta = Math.acos(cosHalfTheta);
    const sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

    if (Math.abs(sinHalfTheta) < 0.001) {
      this.w = 0.5 * (w + this.w);
      this.x = 0.5 * (x + this.x);
      this.y = 0.5 * (y + this.y);
      this.z = 0.5 * (z + this.z);
    }

    const ratioA = Math.sin((1 - time) * halfTheta) / sinHalfTheta;
    const ratioB = Math.sin(time * halfTheta) / sinHalfTheta;

    this.w = w * ratioA + this.w * ratioB;
    this.x = x * ratioA + this.x * ratioB;
    this.y = y * ratioA + this.y * ratioB;
    this.z = z * ratioA + this.z * ratioB;
  }

  public setFromUnitVectors(vectorA: Vector3, vectorB: Vector3): void {
    // http://lolengine.net/blog/2014/02/24/quaternion-from-two-vectors-final
    // assumes direction vectors vectorA and vectorB are normalized

    let realPart = vectorA.dot(vectorB) + 1;

    if (realPart < 0.000001) {
      realPart = 0;

      if (Math.abs(vectorA.x) > Math.abs(vectorA.z)) {
        TMP_VECTOR3.set(-vectorA.y, vectorA.x, 0);
      } else {
        TMP_VECTOR3.set(0, -vectorA.z, vectorA.y);
      }
    } else {
      TMP_VECTOR3.crossVectors(vectorA, vectorB);
    }

    this.x = TMP_VECTOR3.x;
    this.y = TMP_VECTOR3.y;
    this.z = TMP_VECTOR3.z;
    this.w = realPart;

    this.normalize();
  }
}
