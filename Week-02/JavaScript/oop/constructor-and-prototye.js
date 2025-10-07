function Car(brand, model, mileage){
    this.brand = brand
    this.model = model
    this.mileage = mileage
}

Car.prototype.drive = function (km) {
    this.mileage += km
}

Car.prototype.getInfo = function () {
    return `${this.brand} ${this.model} - Mileage: ${this.mileage} km`
}