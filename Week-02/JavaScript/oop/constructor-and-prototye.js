// This is a constructor function which is used to create objects in JavaScript.
function Car(brand, model, mileage){
    this.brand = brand
    this.model = model
    this.mileage = mileage
}

// This is a method added to the prototype of the Car object.
Car.prototype.drive = function (km) {
    this.mileage += km
}

// This is a method added to the prototype of the Car object.
Car.prototype.getInfo = function () {
    return `${this.brand} ${this.model} - Mileage: ${this.mileage} km`
}

// This is an object created using the Car constructor function.
const  bmw = new Car('BMW', 'M02', 25)
bmw.drive(10)
console.log(bmw.getInfo())