import { delay, getNextTransactionId, bookingLogger } from './utils.mjs';

export class TransportTracker {
    constructor() {
        this.students = [];
        this.trips = [];
        this.bookings = [];
        this.logs = [];
        this.queue = [];
        this.isProcessing = false;
    }

    addStudent(student) {
        if (!this.students.find(s => s.id === student.id)) this.students.push(student);
        return this.students;
    }

    addTrip(trip) {
        if (!this.trips.find(t => t.id === trip.id)) this.trips.push(trip);
        return this.trips;
    }

    async bookTrip(studentId, tripId) {
        console.log('in side book trip')
        // push booking request to queue
        this.queue.push({ studentId, tripId });
        await this.processQueue();
        return this.bookings;
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const { studentId, tripId } = this.queue.shift();
            const trip = this.trips.find(t => t.id === tripId);
            let status = 'success';
            let message = 'Booked Successfully';

            if (!trip) {
                status = 'failed';
                message = 'Trip not found';
            } else if (trip.seats <= 0) {
                status = 'failed';
                message = 'All seats booked';
            } else {
                trip.seats--;
                this.bookings.push({
                    transactionId: getNextTransactionId(),
                    studentId,
                    tripId
                });
            }

            // log booking attempt
            bookingLogger(this.logs, {
                tripId,
                studentId,
                status,
                message,
                time: new Date().toISOString()
            });

            await delay(500); // simulate async API delay
        }

        this.isProcessing = false;
    }
}
