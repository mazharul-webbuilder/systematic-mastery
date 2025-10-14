## 🚦 Concurrency & Locking in Node.js

### 🧠 What is Concurrency?
Concurrency happens when multiple parts of a program execute **at the same time** (or overlap in time).  
Even though Node.js is **single-threaded**, it can still perform asynchronous operations concurrently using its **event loop** and **non-blocking I/O** model.

Example:
- Two users trying to **book the last seat** at the same time.
- Two background jobs trying to **update the same file**.

When this overlap occurs, we face a **race condition**.

---

### ⚔️ What is a Race Condition?
A race condition occurs when:
> The outcome of your code depends on the **timing or order** of asynchronous operations.

Example:
1. Both users check for available seats → sees "1 seat left".
2. Both attempt to book → both succeed because the state wasn’t locked.
3. Final seat count becomes `-1`. ❌

---

### 🧱 What is Locking?
**Locking** is the process of controlling access to a shared resource so that **only one operation** can modify it at a time.

In real backend systems (like Laravel or NestJS apps), this is handled using:
- Database transactions (`SELECT FOR UPDATE`)
- Distributed locks (e.g., Redis locks)
- Queues (processing requests sequentially)

---

### 🔐 Types of Locks in Node.js
1. **In-memory Lock**
    - Use a `Map` or `Set` to mark resources as "locked".
    - Works well in a **single-process** environment.
    - Simple but resets when server restarts.

2. **File-based Lock**
    - Write a temporary `.lock` file to indicate a process is using a resource.
    - Used for tasks like file generation, cron jobs, etc.

3. **External Lock (Advanced)**
    - Use Redis or database row-level locks for **multi-instance** systems.
    - Common in production backends (e.g., booking, payments).

---

### 🧩 Step 1: Simulate Race Condition
```js
// race.mjs
class TransportTracker {
    constructor() {
        this.trips = [{ id: 1, seats: 1 }];
        this.bookings = [];
    }

    async bookTrip(studentId, tripId) {
        console.log(`Student ${studentId} checking seat...`);

        // Simulate random network delay
        await new Promise(res => setTimeout(res, Math.random() * 1000));

        const trip = this.trips.find(t => t.id === tripId);
        if (trip.seats > 0) {
            console.log(`Student ${studentId} booked seat ✅`);
            trip.seats--;
            this.bookings.push({ studentId, tripId });
        } else {
            console.log(`Student ${studentId} failed ❌ — no seats left`);
        }
    }
}

const tracker = new TransportTracker();

(async () => {
    await Promise.all([
        tracker.bookTrip(1, 1),
        tracker.bookTrip(2, 1)
    ]);

    console.log("\nFinal Seat Count:", tracker.trips[0].seats);
    console.log("All Bookings:", tracker.bookings);
})();

// Output (Example)
// Student 1 checking seat...
// Student 2 checking seat...
// Student 2 booked seat ✅
// Student 1 booked seat ✅
// Final Seat Count: -1 ❌
// All Bookings: [ { studentId: 2, tripId: 1 }, { studentId: 1, tripId: 1 } ]


```

### 🧩 Step 2: Fix It with Locking
```js
// locking.mjs
class TransportTracker {
    constructor() {
        this.trips = [{ id: 1, seats: 1 }];
        this.bookings = [];
        this.locks = new Set(); // in-memory lock
    }

    async bookTrip(studentId, tripId) {
        if (this.locks.has(tripId)) {
            console.log(`🚫 Student ${studentId}: Trip ${tripId} is locked, try later`);
            return;
        }

        // Lock this trip
        this.locks.add(tripId);

        console.log(`Student ${studentId} checking seat...`);

        await new Promise(res => setTimeout(res, Math.random() * 1000));

        const trip = this.trips.find(t => t.id === tripId);
        if (trip.seats > 0) {
            console.log(`Student ${studentId} booked seat ✅`);
            trip.seats--;
            this.bookings.push({ studentId, tripId });
        } else {
            console.log(`Student ${studentId} failed ❌ — no seats left`);
        }

        // Release lock
        this.locks.delete(tripId);
    }
}

const tracker = new TransportTracker();

(async () => {
    await Promise.all([
        tracker.bookTrip(1, 1),
        tracker.bookTrip(2, 1)
    ]);

    console.log("\nFinal Seat Count:", tracker.trips[0].seats);
    console.log("All Bookings:", tracker.bookings);
})();

// Output (Safe Version)
// Student 1 checking seat...
// 🚫 Student 2: Trip 1 is locked, try later
// Student 1 booked seat ✅
// Final Seat Count: 0
// All Bookings: [ { studentId: 1, tripId: 1 } ]


```


