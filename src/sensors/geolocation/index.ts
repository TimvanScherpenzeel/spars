export class Geolocation {
  private static getGeolocation = (): Promise<Coordinates> =>
    new Promise((resolve, reject): void => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            resolve(position.coords);
          },
          err => {
            reject(err);
          }
        );
      } else {
        reject('Geolocation sensor is unavailable');
      }
    });

  constructor() {
    return Geolocation.getGeolocation();
  }
}
