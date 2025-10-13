class TransportTrackerAsync {
    constructor() {
        this.students = [];
        this.trips = [];
        this.bookings = [];
    }

    async addStudent(student) {
        // Simulate delay
        await new Promise(res => setTimeout(res, 500));
        this.students.push({ id: student.id, name: student.name });
        return this.students;
    }

    async addTrip(trip) {
        await new Promise(res => setTimeout(res, 500));
        this.trips.push({ ...trip });
        return this.trips;
    }

    async bookStudent({ studentId, tripId }) {
        await new Promise(res => setTimeout(res, 500));

        const trip = this.trips.find(t => t.id === tripId);
        if (!trip) return 'Trip not found';
        if (trip.seats <= 0) return 'No seats available';

        const alreadyBooked = this.bookings.some(b => b.studentId === studentId && b.tripId === tripId);
        if (alreadyBooked) return 'Student already booked';

        this.bookings.push({ studentId, tripId });
        trip.seats -= 1;

        return this.bookings;
    }

    async listTrips() {
        await new Promise(res => setTimeout(res, 300));
        return this.trips;
    }

    async getStudentBookings(studentId) {
        await new Promise(res => setTimeout(res, 300));
        const bookings = this.bookings.filter(b => b.studentId === studentId);
        if (bookings.length === 0) return 'No Booking found';
        return bookings;
    }
}

(async () => {
    const tracker = new TransportTrackerAsync();

    await tracker.addStudent({ id: 1, name: "Zayaan" });
    await tracker.addStudent({ id: 2, name: "Lammim" });

    await tracker.addTrip({ id: 1, from: "Home", to: "NSU", date: "2025-10-20", seats: 2 });

    console.log(await tracker.bookStudent({ studentId: 1, tripId: 1 }));
    console.log(await tracker.bookStudent({ studentId: 2, tripId: 1 }));
    console.log(await tracker.bookStudent({ studentId: 2, tripId: 1 })); // Should say already booked
    console.log(await tracker.bookStudent({ studentId: 3, tripId: 1 })); // Student not exist case (can enhance)

    console.log(await tracker.listTrips());
    console.log(await tracker.getStudentBookings(1));
})();
