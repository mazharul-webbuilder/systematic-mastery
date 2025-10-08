// Q1 — Variables & Types
let x = 10
const y = x
x = 20
console.log(x, y) // 20, 10
// Gap to note: Understand primitive vs reference types — objects/arrays behave differently.

// Q2 — Operators
const a = 5;
const b = "5";
console.log(a == b, a === b); // true, false

// Q3 — Arrays
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 1, 99, 11);
console.log(arr); //[ 1, 2, 99, 11, 4, 5 ]


// Q4 — Array Methods
const nums = [1, 2, 3, 4, 5];
const result = nums.filter(n => n % 2 === 0).map(n => n * 2);
console.log(result); // [4, 8]


// Q5 — Objects
const obj = {name: "Zayaan", age: 1};
const copy = {...obj, age: 2};
console.log(obj.age, copy.age); // 1 2
// Gap: Destructuring and spread is essential for immutability in real projects.

// Q6 — Functions & Closures
function makeCounter() {
    let count = 0;
    return () => ++count;
}

const counter = makeCounter();
counter();
counter();
console.log(counter()); // 3

// Q7 — Classes & OOP
class Car {
    constructor(model) {
        this.model = model;
    }

    getModel() {
        return this.model;
    }
}

const c = new Car("BMW");
console.log(c.getModel()); // BMW

// Q8 — Async JS — Promises
function p1() {
    return Promise.resolve("Done");
}
p1().then(res => console.log(res));

console.log("Next");
// Next, Done

// Q9 — Async JS — async/await
async function f() {
    console.log("Start");
    await Promise.resolve();
    console.log("End");
}
f();
console.log("After f()"); // Start, after f, end

// Q10 — Event Loop
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
// A, D, C, B

// Q11 — Closure + Advanced Function
function createAdder(x) {
    return function(y) { return x + y; }
}
const add5 = createAdder(5);
console.log(add5(10)); // 15


// Q12 — Real-world Mini Challenge
// Complete this function to calculate total price
const cart = [
    { name: "Apple", price: 10, qty: 2 },
    { name: "Banana", price: 5, qty: 5 }
];
function getCartTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.qty, 0)
}
console.log(getCartTotal(cart)); // should log 45












