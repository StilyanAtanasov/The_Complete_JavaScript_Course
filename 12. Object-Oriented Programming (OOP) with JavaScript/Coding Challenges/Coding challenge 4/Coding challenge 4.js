"use strict";

// ----- Coding Challenge 4 -----

// 1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
// 2. Make the 'charge' property private;
// 3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. Then experiment with chaining!

// DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

// --- 1 ---
class CarCl {
  constructor(make, currentSpeed) {
    this.make = make;
    this.currentSpeed = currentSpeed;
  }

  accelerate() {
    this.currentSpeed += 10;
    console.log(`${this.make} going at ${this.currentSpeed} km/h`);
  }

  brake() {
    this.currentSpeed -= 5;
    console.log(`${this.make} going at ${this.currentSpeed} km/h`);
    return this;
  }
}

class EVCl extends CarCl {
  // --- 2 ---
  #charge;

  constructor(make, currentSpeed, charge) {
    super(make, currentSpeed);
    this.#charge = charge;
  }

  // --- 3 ---
  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.currentSpeed += 20;
    this.#charge--;
    console.log(`${this.make} going at ${this.currentSpeed} km/h, with a charge of ${this.#charge}%`);

    return this;
  }
}

const rivian = new EVCl(`Rivian`, 120, 23);
rivian.accelerate().accelerate().brake().chargeBattery(50).accelerate();
