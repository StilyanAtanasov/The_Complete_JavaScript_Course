"use strict";

class Workout {
  #workoutIdCounter = 0;

  constructor(distance, duration, coords, date, id) {
    this.id = id || this.#generateUniqueId(Date.now());
    this.distance = distance;
    this.duration = duration;
    this.coords = coords;
    this.date = date;
  }

  get description() {
    return `${this.constructor.name} on ${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}`;
  }

  #generateUniqueId = date => `${date}-${++this.#workoutIdCounter}`;
}

class Running extends Workout {
  type = `running`;

  constructor(distance, duration, cadence, coords, date, id) {
    super(distance, duration, coords, date, id);
    this.cadence = cadence;
    this.pace = this.#calcPace(distance, duration);
  }

  #calcPace = (distance, duration) => (distance / duration).toFixed(2);
}

class Cycling extends Workout {
  type = `cycling`;

  constructor(distance, duration, elevation, coords, date, id) {
    super(distance, duration, coords, date, id);
    this.elevation = elevation;
    this.speed = this.#calcSpeed(distance, duration);
  }

  #calcSpeed = (distance, duration) => (distance / (duration / 60)).toFixed(2);
}
