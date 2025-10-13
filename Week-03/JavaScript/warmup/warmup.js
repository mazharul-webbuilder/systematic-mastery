// ⚙️ Warm-up #1 — Closure Logic
function createCounter(start = 0){
    let count = start;

    return {
        increment: () => ++count,
        reset: () => count = start,
        get: () => count
    }
}

const c1 = createCounter(2);
const c2 = createCounter(5);

c1.increment(); // 3
c2.increment(); // 6
console.log(c1.get(), c2.get());
c1.reset();
console.log(c1.get(), c2.get()); // 2, 6


// ⚙️ Warm-up #2 — Async Challenge (Predict Output)
console.log("Start");

setTimeout(() => console.log("Timeout 1"), 0);

Promise.resolve()
    .then(() => console.log("Promise 1"))
    .then(() => console.log("Promise 2"));

console.log("End");

// Output
// Start
// End
// Promise 1
// Promise 2
// Timeout 1


// ⚙️ Warm-up #3 — Nested Async Challenge
console.log("A");

setTimeout(() => {
    console.log("B");

    Promise.resolve().then(() => console.log("C"));
}, 0);

Promise.resolve().then(() => console.log("D"));

console.log("E");

// Output:
// A
// E
// D
// B
// C


