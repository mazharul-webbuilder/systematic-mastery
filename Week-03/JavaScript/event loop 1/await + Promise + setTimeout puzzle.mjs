console.log("Start");

setTimeout(() => console.log("Timeout 1"), 0);

Promise.resolve().then(() => {
    console.log("Promise 1");
    setTimeout(() => console.log("Timeout inside Promise 1"), 0);
});

(async function asyncFunc() {
    console.log("Async Start");
    await Promise.resolve();
    console.log("Async After Await");
})();

Promise.resolve().then(() => console.log("Promise 2"));

console.log("End");

// Output
// Start
// Async Start
// End
// Promise 1
// Async After Await
// Promise 2
// Timeout 1
// Timeout inside Promise 1
