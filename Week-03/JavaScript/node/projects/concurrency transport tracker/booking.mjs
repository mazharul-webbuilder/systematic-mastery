import { delay, nextUniqueId } from "./utilis.mjs";

export default class BookingManager {
    constructor(logger) {
        this.bookings = [];
        this.queue = [];
        this.isProcessing = false;
        this.getNextId = nextUniqueId();
        this.logger = logger;
    }

    async book(studentId, trip) {
        return new Promise((res) => {
            this.queue.push({ studentId, trip, res });
            this.processQueue();
        });
    }

    async processQueue() {
        if (this.isProcessing) return;
        this.isProcessing = true;

        while (this.queue.length > 0) {
            const { studentId, trip, res } = this.queue.shift();

            if (trip.seats <= 0) {
                this.logger.log("FAILED", studentId, "No seats left", trip.id);
                res({ status: "failed", message: "No seats left" });
                continue;
            }

            await delay(500); // Simulate async booking
            trip.seats--;
            const booking = { id: this.getNextId(), studentId, tripId: trip.id };
            this.bookings.push(booking);
            this.logger.log("SUCCESS", studentId, "Booked successfully", trip.id);
            res({ status: "success", booking });
        }

        this.isProcessing = false;
    }

    getStudentBookings(studentId) {
        return this.bookings.filter(b => b.studentId === studentId);
    }
}
