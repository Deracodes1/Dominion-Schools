"use strict";

// // generating random 10 digits number from 1 tp 10
// function unique() {
//   let text = "";
//   let randomString = "0123456789";
//   for (let i = 0; i < 10; i++) {
//     text += randomString.charAt(
//       Math.floor(Math.random() * randomString.length)
//     );
//   }
//   return text;
// }
// console.log(unique());

// // generating random 10 digits based on today's date
// let uniqueNum = new Date().valueOf();
// let extruniqueNum = String(uniqueNum).substring(0, 10);
// console.log(uniqueNum, extruniqueNum);

const generateUniqueCode = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};
console.log(generateUniqueCode());

// const Corper = function (firstName, surName, ppa, CDS) {
//   this.firstName = firstName;
//   this.surName = surName;
//   this.CDS = CDS;
//   this.ppa = ppa;
// };

// const chidera = new Corper(
//   "Chidera",
//   "Ezemenia",
//   "Government house",
//   "Environmental"
// );
// console.log(chidera);

// Corper.prototype.printText = function () {
//   return `Dear Corp Member, ${this.firstName} ${this.surName} your PPA is ${this.ppa} and your CDS is ${this.CDS}`;
// };

// console.log(chidera.printText("Government house", "Environmental"));

// /*
// 1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
// 4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

// DATA CAR 1: 'BMW' going at 120 km/h
// DATA CAR 2: 'Mercedes' going at 95 km/h

// GOOD LUCK 😀
// */

// const Car = function (make, speed) {
//   this.make = make;
//   this.speed = speed;
// };

// Car.prototype.accelerate = function () {
//   this.speed += 10;
//   return `'${this.make}' is going at ${this.speed + 10} km/h`;
// };
// Car.prototype.brake = function () {
//   this.speed -= 5;
//   return `'${this.make}' is going at ${this.speed} km/h`;
// };
// const car1 = new Car("BMW", 120);
// const car2 = new Car("Mercedes", 100);
// console.log(car1.accelerate());
// console.log(car1.accelerate());
// console.log(car2.brake());
// console.log(car2.brake());
// console.log(car2.brake());

class Adult {
  constructor(fName, birthYear) {
    this.fName = fName;
    this.age = 2002;
    this.birthYear = birthYear;
  }
  calCage() {
    return `${this.fName} is ${2025 - this.birthYear} years old`;
  }
}
const chidera = new Adult("Chidera", 2002);
console.log(chidera, chidera.calCage());

class UserAccount {
  #balance;
  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
  }
  get balance() {
    return this.#balance;
  }
  set deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      console.log(
        `Dear, ${
          this.owner
        }, your deposit of ${amount} was successful, your balance is ${
          this.#balance
        }`
      );
    } else {
      console.log(`deposit amount must be a postive value`);
    }
  }
  set withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      console.log(
        `Dear, ${
          this.owner
        }, your withdawal of ${amount} was successful, your balance is ${
          this.#balance
        }`
      );
    } else {
      console.log(`can't place a withdawal now, top up your balance`);
    }
  }
}

const user1 = new UserAccount("chidera", 5000);
console.log(user1);
console.log(user1._balance);
user1.deposit = 5000;
user1.withdraw = 9000;
///////////////////////////////////////
// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, 
by multiplying the input by 1.6);
// 2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
// 3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

class Vehicle {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUSS(currentSpeed) {
    const speepKMH = (currentSpeed *= 1.6);
    this.speed = speepKMH / 1.6;
  }
  brake() {
    this.speed -= 5;
    return this.speed;
  }
  accelerate() {
    this.speed += 10;
    return this.speed;
  }
}

const myVehicle = new Vehicle("Venza", 150);
console.log(myVehicle);
console.log(myVehicle.accelerate());
console.log(myVehicle.brake());
console.log(myVehicle.speedUS);
myVehicle.speedUSS = myVehicle.speed;
console.log(myVehicle.speed);

class PersonCl {
  constructor(fullName, age, birthYear) {
    this.fullName = fullName;
    this.age = age;
    this.birthYear = birthYear;
  }
  verifyAge() {
    console.log(`your original bithyear is ${
      2025 - this.birthYear
    } but you provided ${this.age} as
    your age which is ${
      2025 - this.birthYear === this.age ? "true" : "false"
    }`);
  }
}

const chideraa = new PersonCl("Ezemenia chidera", 23, 2002);
console.log(chideraa);

class Paramilitarycl extends PersonCl {
  constructor(fullName, age, birthYear, unit) {
    super(fullName, age, birthYear);
    this.unit = unit;
  }
  checkUnit() {
    console.log(`Dear ${this.fullName}, your unit is ${this.unit}`);
  }
}

const chikaArmy = new Paramilitarycl("Chika Anya", 67, 1958, "Army");
chikaArmy.verifyAge();
chikaArmy.checkUnit();

// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, 
and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;
}

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude, longitude } = position.coords;
    console.log(latitude, longitude);
    console.log(position);
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);
  },
  function () {
    console.log(`cant get your location, grant pemission`);
  }
);
