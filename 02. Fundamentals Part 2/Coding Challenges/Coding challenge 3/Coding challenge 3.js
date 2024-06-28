'use strict';

mark = {
    fullName: `Mark Miller`,
    mass: 78,
    height: 1.69,

    calcBMI: function () {
        this.calculation = this.mass / this.height ** 2;
        return this.calculation;
    }
};

john = {
    fullName: `John Smith`,
    mass: 92,
    height: 1.95,

    calcBMI: function () {
        this.calculation = this.mass / this.height ** 2;
        return this.calculation;
    }
};

mark.calcBMI();
john.calcBMI();

console.log(mark.calculation);
console.log(john.calculation);

console.log(`${mark.fullName}'s BMI (${mark.calculation}) is ${mark.calculation > john.calculation ? `higher` : `lower`} than ${john.fullName}'s BMI(${john.calculation}).`);