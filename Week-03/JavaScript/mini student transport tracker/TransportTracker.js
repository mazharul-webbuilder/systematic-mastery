class TransportTracker {
    constructor() {
        this.students = []
        this.trips = []
        this.bookings = []
    }

    addStudent(student) {
        this.students.push({
            id: student.id,
            name: student.name
        })

        return this.students
    }

    addTrip(trip) {
        this.trips.push({
            id: trip.id,
            from: trip.from,
            to: trip.to,
            date: trip.date,
            seats: trip.seats
        })
        return this.trips
    }

    bookStudent(bookingInfo) {
        const {studentId, tripId} = bookingInfo

        console.log(studentId, tripId)

        const trip = this.trips.find(trip => trip.id === tripId)

        if (!trip) {
            return 'Trip Not Found'
        }

        const newBooking = {
            studentId,
            tripId
        }
        this.bookings.push(newBooking)
        trip.seats = trip.seats - 1
        return this.bookings

    }

    listTrips(){
        return this.trips
    }
    getStudentBookings(studentId){
        const booking = this.bookings.find(b => b.studentId === studentId)

        if (!booking){
            return 'No Booking found for this student'
        }

        return  booking

    }

}

const tracker = new TransportTracker();

// Add students
const registeredStudents = tracker.addStudent({ id: 1, name: "Zayaan" });

// Add trips
tracker.addTrip({ id: 1, from: "Home", to: "NSU", date: "2025-10-20", seats: 40 });

// Book a student
const bookings = tracker.bookStudent({
    studentId: 1,
    tripId: 1
});

// List available trips
const trips = tracker.listTrips();

// Show bookings for a student
const studentBooking  = tracker.getStudentBookings(1);

console.log(registeredStudents, trips, studentBooking, bookings)
