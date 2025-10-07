// Problem 1 — functions and this
const car = {
    brand: 'BMW',
    model: 'M-02',
    mileage: 12,
    drive: function (km){
        this.mileage += km
    },
    getInfo: function (){
        return `${this.brand} ${this.model} - Mileage: ${this.mileage} km`;
    }
}

// Factory Function
function createCar(brand, model, mileage){
    return {
        brand,
        model,
        mileage,
        drive: function (km){
            return this.mileage += km
        },
        getInfo: function (){
            return `${this.brand} ${this.model} - Mileage: ${this.mileage} km`;
        }
    }
}

