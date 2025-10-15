console.log(1);

setTimeout(() => {
    console.log(2);
}, 0);

async function microTaskCreator() {
    console.log(3);
    await Promise.resolve();
    console.log(4);
}

Promise.resolve().then(() => {
    console.log(5);
    // This new promise resolution goes straight to the Microtask Queue
    Promise.resolve().then(() => console.log(6));
});

microTaskCreator();

console.log(7);

// Output
// 1
// 3
// 7
// 5
// 4
// 6
// 2