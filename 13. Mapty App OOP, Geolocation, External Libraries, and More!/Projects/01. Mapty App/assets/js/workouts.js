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
    return `${this.constructor.name} on ${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()} | ${String(this.date.getHours()).padStart(2, `0`)}:${String(
      this.date.getMinutes()
    ).padStart(2, `0`)}`;
  }

  get marker() {
    return this._marker;
  }

  set marker(value) {
    this._marker = value;
  }

  #generateUniqueId = date => `${date}-${++this.#workoutIdCounter}`;
}

class Running extends Workout {
  type = `running`;

  constructor(distance, duration, cadence, coords, date, id) {
    super(distance, duration, coords, date, id);
    this.cadence = cadence;
  }

  #calcPace = (distance, duration) => (distance / duration).toFixed(2);

  get pace() {
    return this.#calcPace(this.distance, this.duration);
  }
}

class Cycling extends Workout {
  type = `cycling`;

  constructor(distance, duration, elevation, coords, date, id) {
    super(distance, duration, coords, date, id);
    this.elevation = elevation;
  }

  #calcSpeed = (distance, duration) => (distance / (duration / 60)).toFixed(2);

  get speed() {
    return this.#calcSpeed(this.distance, this.duration);
  }
}
