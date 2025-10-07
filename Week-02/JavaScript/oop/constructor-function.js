/**
 Constructor Function
 A special kind of function used to create objects.
 Use the new keyword to instantiate.
 Inside, this refers to the new object being created.
 */
function Car(brand, model, mileage){
    this.brand = brand
    this.model = model
    this.mileage = mileage
}

const car1 = new Car('BMW', 'M-02', 12)
console.log(car1.brand)