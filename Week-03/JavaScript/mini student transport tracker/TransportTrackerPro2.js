// Data
const trips = [
    {id: 1, from: "Home", to: "NSU", seats: 2},
];

const students = [
    {id: 1, name: "Zayaan"},
    {id: 2, name: "Lammim"},
    {id: 3, name: "Rakib"},
];

// Transport Booking System
class TransportSystem {
    constructor(trips) {
        this.trips = trips;
        this.bookings = [];
        this.log = []
    }

    // Async booking method
    async bookTrip(studentId, tripId) {
        // Simulate API delay
        await new Promise(res => setTimeout(res, Math.random() * 1000));

        const trip = this.trips.find(trip => trip.id === tripId)
        let status = undefined
        let message = undefined
        if (!trip) {
            status = 'failed'
            message = 'Trip Not found'
        }
        if (!trip.seats) {
            status = 'failed'
            message = 'All seats are booked'
        } else {
            trip.seats--
            this.bookings.push({
                studentId,
                tripId
            })
            status = 'success'
            message = 'Booked Successfully'
        }
        this.log.push({
            tripId,
            studentId,
            status,
            message
        })
        return this.bookings

    }

}

const system = new TransportSystem(trips);

// Concurrent bookings simulation
async function simulateBookings() {
    const bookingPromises = students.map(s =>
        system.bookTrip(s.id, 1)
    );
    await Promise.all(bookingPromises);

    console.log("Final Bookings:", system.bookings, system.log);
}

simulateBookings();
