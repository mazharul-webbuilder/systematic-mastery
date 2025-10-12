// 🧩 Challenge: Promise Chain with Dependency
function task(msg, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(msg);
            resolve(msg.length);
        }, delay);
    });
}

task("Zayaan", 1000)
    .then(len => task("Length: " + len, 500))
    .then(() => task("Done ✅", 300));

// Output:
// Zayaan
// Length: 6
// Done