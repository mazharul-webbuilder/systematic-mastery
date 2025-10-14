// JS Mastery Assessment
// Q1 - Array Manipulation
const numbers = [1, 2, 3, 4, 5]

const result = numbers.filter(n => n % 2 === 0)
    .map(n => n * 2)
    .reduce((sum, n) => sum + n, 0)
// Output : 12

// Q2 — Object & Destructuring
const student = {
    name: "Zayaan", age: 1, hobbies: ["playing", "crawling", "sleeping"], address: {city: "Cumilla", district: "Lalmai"}
};

const {name, address: {district}, ...rest} = student;
const [firstHobby] = student.hobbies;

// Output : Zayaan, Lalmai, {age: 1, hobbies: []},  playing,

// Q3 — Closure
function createCounter(start = 0) {
    let count = start;
    return {
        increment: () => ++count, decrement: () => --count, getCount: () => count
    };
}

const counter = createCounter(5);
counter.increment();
counter.increment();
counter.decrement();
let getCount = counter.getCount();

// Output: 6


// Q4 -- Async/Promises
console.log("Start");

setTimeout(() => console.log("Timeout 1"), 0);

Promise.resolve().then(() => console.log("Promise 1"));

(async function () {
    console.log("Async Start");
    await Promise.resolve();
    console.log("Async End");
})();

console.log("End");

// Output: Start, Async Start, Async End, End, Promise 1, Timeout 1


// Q5 — ES6 Features & Spread / Rest
const arr1 = [1, 2];
const arr2 = [3, 4];
const arr3 = [5];

const merged = [...arr1, ...arr2, ...arr3];
const [first, ...rest] = merged;

console.log(first, rest);

// Output: 1, [2, 3,4,5]


// Q6 — Object Method & this
const car = {
    brand: "BMW",
    model: "X5",
    mileage: 10,
    drive: function (km) {
        this.mileage += km;
    },
    getInfo: function () {
        return `${this.brand} ${this.model} - Mileage: ${this.mileage}`;
    }
};

car.drive(5);
console.log(car.getInfo());

// Output: BMW X5 - Mileage 15


// Q7 -- Promise Chaining
function fetchUser() {
    return new Promise(res => setTimeout(() => res("User Loaded"), 1000));
}

function fetchPosts() {
    return new Promise(res => setTimeout(() => res("Posts Loaded"), 500));
}

fetchUser()
    .then(user => {
        console.log(user);
        return fetchPosts();
    })
    .then(posts => console.log(posts));


// Output
// User Loaded
// Posts Loaded
