// 🧩 Section 1: Core JS Concepts & Behavior
// Predict the output and briefly explain why (1–2 lines per question).
// Q1
let x = { a: 10 };
let y = x;
y.a = 20;
y = { a: 30 };
console.log(x.a);

// Output 20
// Reason:


// Q2
const obj = { name: "Zayaan", info: { age: 1 } };
const copy = { ...obj };
copy.info.age = 2;

// Output
// 2


// Q3
console.log(a);
var a = 5;
(() => {
    console.log(a);
    var a = 10;
})();

// Output : undefined

// Q4
function foo(a, b = a + 2) {
    return b;
}
console.log(foo(3));
// Output: 5
console.log("Start");

setTimeout(() => console.log("Timeout"), 0);

Promise.resolve().then(() => console.log("Promise 1"));

(async () => {
    console.log("Async Start");
    await null;
    console.log("Async End");
})();

console.log("End");
// Output
// Start
// Async Start
// End
// Promise 1
// Async End
// Timeout


// Q6
async function run() {
    console.log("A");
    await Promise.resolve().then(() => console.log("B"));
    console.log("C");
}
run();
console.log("D");

// Output
// A
// D
// B
// C
const items = [1, 2, 3];
for (var i = 0; i < items.length; i++) {
    setTimeout(() => console.log(items[i]), 1000);
}
