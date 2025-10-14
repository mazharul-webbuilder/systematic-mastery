// queue-lock.mjs
class TransportTracker {
    constructor() {
        this.trips = [{ id: 1, seats: 2 }, {id: 2, seats: 2}];
        this.bookings = [];
        this.locks = new Map(); // tripId -> promise chain
    }

    async bookTrip(studentId, tripId) {
        if (!this.locks.has(tripId)) {
            this.locks.set(tripId, Promise.resolve()); // initialize empty queue
        }

        // Add this booking to the queue chain
        const chain = this.locks.get(tripId).then(async () => {
            console.log(`🕐 Student ${studentId} is processing trip ${tripId}...`);

            // Simulate async DB delay
            await new Promise(res => setTimeout(res, Math.random() * 1000));

            const trip = this.trips.find(t => t.id === tripId);

            if (trip.seats > 0) {
                trip.seats--;
                this.bookings.push({ studentId, tripId });
                console.log(`✅ Student ${studentId} booked successfully.`);
            } else {
                console.log(`❌ Student ${studentId} failed — no seats left.`);
            }
        });

        // Update the queue chain for this trip
        this.locks.set(tripId, chain);
        await chain;
    }
}

const tracker = new TransportTracker();

(async () => {
    await Promise.all([
        tracker.bookTrip(1, 1),
        tracker.bookTrip(2, 2),
        tracker.bookTrip(3, 1),
        tracker.bookTrip(4, 1),
    ]);

    console.log("\n📊 Final State:");
    console.log("Seats left Trip 1:", tracker.trips[0].seats);
    console.log("Seats left Trip 2:", tracker.trips[1].seats);
    console.log("Bookings:", tracker.bookings);
})();

// Sample Output:
// 🕐 Student 1 is processing trip 1...
// ✅ Student 1 booked successfully.
// 🕐 Student 2 is processing trip 1...
// ✅ Student 2 booked successfully.
// 🕐 Student 3 is processing trip 1...
// ❌ Student 3 failed — no seats left.
// 🕐 Student 4 is processing trip 1...
// ❌ Student 4 failed — no seats left.
//
// 📊 Final State:
//     Seats left: 0
// Bookings: [ { studentId: 1, tripId: 1 }, { studentId: 2, tripId: 1 } ]