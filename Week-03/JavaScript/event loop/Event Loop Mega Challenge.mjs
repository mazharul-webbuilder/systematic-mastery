console.log("1️⃣ Start"); // Sync 1

setTimeout(() => console.log("2️⃣ Timeout 1"), 0); // Macro 1

Promise.resolve() // Micro 1
    .then(() => {
        console.log("3️⃣ Promise 1");
        setTimeout(() => console.log("4️⃣ Timeout inside Promise"), 0);
    })
    .then(()  => console.log("5️⃣ Promise 2" ));

(async function() {
    console.log("6️⃣ Async Start"); // Sync 2
    // await does not block the event loop.
    // It pauses only inside that async function, and the rest of the code in other functions (including synchronous code and Promise .then() chains) continues executing.
    // The event loop always finishes all microtasks of the current turn before moving to the next macrotask.
    // That’s why await resumes as a microtask — it can run after current microtasks, not immediately.
    await Promise.resolve(); // Micro 2
    console.log("7️⃣ Async After Await"); // Sync 4
})();

console.log("8️⃣ End"); // Sync 3


// Output
// Start
// Async Start
// End
// Promise 1
// Async After Await
// Promise 2
// Timeout 1
// Timeout inside promise
