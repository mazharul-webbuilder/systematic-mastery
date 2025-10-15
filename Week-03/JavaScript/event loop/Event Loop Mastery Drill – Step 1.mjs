// Task:
//  Predict the exact output order.
//  Remember: sync → microtasks → macrotasks.
console.log("Start"); // 1

setTimeout(() => console.log("Timeout 1"), 0); // macro

Promise.resolve().then(() => console.log("Promise 1")); // micro

(async () => {
    console.log("Async Start"); // sync inside async IIFE
    await Promise.resolve();
    console.log("Async End"); // after microtask
})();

console.log("End"); // sync

// Output:
// Start
// Async Start
// End
// Promise 1
// Async End
// Timeout 1
