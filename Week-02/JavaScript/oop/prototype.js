/**
 *  Prototype
 * Every JS function has a prototype object.
 * Objects created with new share the methods on the prototype.
 * This saves memory because methods aren’t recreated for each instance.
 * */
function Car(brand, model, mileage){
    this.brand = brand
    this.model = model
    this.mileage = mileage
}

Car.prototype.drive = function (km){
    this.mileage += km
}

Car.prototype.getInfo = function (){
    return `${this.brand} ${this.model} - Mileage: ${this.mileage} km`
}

const car1 = new Car('BMW', 'M02', 58);
const car2 = new Car('Audi', 'A6', 20);
car1.drive(5);
console.log(car1.getInfo()); // BMW M-02 - Mileage: 17 km
console.log(car2.getInfo()); // Audi A6 - Mileage: 20 km


// NOTE: JS Classes, which are just syntactic sugar over constructor + prototype.