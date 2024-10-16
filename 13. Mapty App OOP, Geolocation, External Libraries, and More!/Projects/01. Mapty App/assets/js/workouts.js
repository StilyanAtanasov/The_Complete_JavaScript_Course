"use strict";

class Workout {
  constructor(distance, duration, coords, date) {
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
    this.date = date;
  }
}

class Running extends Workout {
  constructor(distance, duration, cadence, coords, date) {
    super(distance, duration, coords, date);
    this.cadence = cadence;
    this.pace = this.#calcPace(distance, duration);
  }

  #calcPace = (distance, duration) => (distance / duration).toFixed(2);
}

class Cycling extends Workout {
  constructor(distance, duration, elevation, coords, date) {
    super(distance, duration, coords, date);
    this.elevation = elevation;
    this.speed = this.#calcSpeed(distance, duration);
  }

  #calcSpeed = (distance, duration) => (distance / (duration / 60)).toFixed(2);
}
