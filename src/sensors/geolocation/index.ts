// Add geolocation sensor

// https://github.com/kenchris/sensor-polyfills/blob/master/src/geolocation-sensor.js

export class Geolocation {
  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
      });
    } else {
      console.error('Geolocation sensor is unavailable');
    }
  }
}
