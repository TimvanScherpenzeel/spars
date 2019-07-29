export class Geolocation {
  constructor() {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(
        (permissionStatus): Promise<Position | boolean> => {
          if (permissionStatus.state === 'granted') {
            return this.getCurrentPosition();
          } else {
            return Promise.resolve(false);
          }
        }
      );
    } else {
      this.getCurrentPosition();
    }
  }

  private getCurrentPosition(): Promise<Position> {
    return new Promise((resolve, reject): void => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve(position);
          },
          err => {
            reject(err);
          }
        );
      } else {
        console.warn('Geolocation sensor is unavailable');
        reject();
      }
    });
  }
}
