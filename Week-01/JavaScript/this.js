// // 1. Global Context
// console.log(this)
//
// // 2. Inside an Object  (Method Call)
// const user = {
//     name: 'Zayaan',
//     greet() {
//         console.log("Hi, I am " + this.name)
//     }
// }
//
// user.greet()
//
// // 3. Function Call
// function show() {
//     console.log(this)
// }
//
// // 4. Arrow Functions
// const obj = {
//     name: "JS",
//     arrowFn: () => console.log(this.name), // undefined
//     normalFn() {
//         console.log(this.name)
//     } // JS
// }
//
// // 5. In Classes
// class Student {
//     constructor(name) {
//         this.name = name
//     }
//
//     sayHi() {
//         console.log("Hi " + this.name)
//     }
//
// }
//
// const s1 = new Student("Zayaan")
// s1.sayHi() // "Hi Zayaan"
//
// // 6. Call, Apply, Bind
// function greet(lang){
//     console.log(`Hello ${this.name}, in ${lang}`)
// }
//
// const person = {name: "Mazhaurl"}
//
// greet.call(person, "JS")
// greet.apply(person, ['php'])
// const boundFn = greet.bind(person, "Python")
// boundFn()
//
//
// const account = {
//     owner: "Zayaan",
//     balance: 0,
//     deposit(amount) {
//         this.balance += amount
//     },
//     withdraw(amount){
//         this.balance -= amount
//     }
// }
//
// const anotherAccount = {
//     owner: "Lammim",
//     balance: 100
// }
//
// account.deposit.call(anotherAccount, 50)

// Create an object:
const person = {
    firstName  : "John",
    lastName   : "Doe",
    id     : 5566,
    myFunction : function() {
        return this;
    }
};

// Display data from the object:
console.log(person.myFunction());