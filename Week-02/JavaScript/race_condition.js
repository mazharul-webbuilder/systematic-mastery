// Race Condition scenario

let balance = 100;

function withdraw(amount) {
    if (balance >= amount) {
        // Simulate delay
        setTimeout(() => {
            balance -= amount;
            console.log(`Withdrawn: ${amount}, Remaining balance: ${balance}`);
        }, 100);
    } else {
        console.log("Insufficient funds");
    }
}

// Two withdrawals happening "concurrently"
withdraw(80); // Withdrawn: 80, Remaining balance: 20
withdraw(30); // Withdrawn: 30, Remaining balance: -10


// Preventing race condition
balance = 100;
let locked = false;

async function withdrawWithLock(amount) {
    // Wait until lock is free
    while (locked) {
        await new Promise(r => setTimeout(r, 10));
    }
    locked = true;

    try {
        if (balance >= amount) {
            balance -= amount;
            console.log(`Withdrawn: ${amount}, Remaining balance: ${balance}`);
        } else {
            console.log("Insufficient funds");
        }
    } finally {
        // Always release lock, even if error occurs
        locked = false;
    }
}
// Two withdrawals happening "concurrently"
withdrawWithLock(80); // Withdrawn: 80, Remaining balance: 20
withdrawWithLock(30); // Insufficient funds


