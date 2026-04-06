// // 1. Global Context
console.log(this) // {}
//
// 2. Inside an Object  (Method Call)
const user = {
    name: 'Zayaan',
    greet() {
        console.log("Hi, I am " + this.name)
    }
}
user.greet() // Hi, I am Zayaan

// 3. Function Call
function show() {
    console.log(this)
}

//show() // Global Object

// // 4. Arrow Functions
const obj = {
    name: "JS",
    arrowFn: () => console.log(this.name), // undefined
    normalFn() {
        console.log(this.name)
    }
}

obj.arrowFn() // undefined
obj.normalFn() // JS

// 5. In Classes
class Student {
    constructor(name) {
        this.name = name
    }

    sayHi() {
        console.log("Hi " + this.name)
    }

}

const s1 = new Student("Zayaan")
s1.sayHi() // "Hi Zayaan"

// 6. Call, Apply, Bind
function greet(lang) {
    console.log(`Hello ${this.name}, in ${lang}`)
}

const person = { name: "Mazhaurl" }

// Call
// Pass arguments as comma separated values
greet.call(person, "JS") // Hello Mazhaurl, in JS
// Apply
// Pass arguments as an array
greet.apply(person, ['php']) // Hello Mazhaurl, in php
// Bind
// pass arguments as comma separated values
// Returns a new function with the context bound
const boundFn = greet.bind(person, "Python")
boundFn() // Hello Mazhaurl, in Python


const account = {
    owner: "Zayaan",
    balance: 0,
    deposit(amount) {
        this.balance += amount
    },
    withdraw(amount){
        this.balance -= amount
    }
}

const anotherAccount = {
    owner: "Lammim",
    balance: 100
}

account.deposit.call(anotherAccount, 50)

// Create an object:
const person2 = {
    firstName  : "John",
    lastName   : "Doe",
    id     : 5566,
    myFunction : function() {
        return this;
    }
};

// Display data from the object:
console.log(person2.myFunction());