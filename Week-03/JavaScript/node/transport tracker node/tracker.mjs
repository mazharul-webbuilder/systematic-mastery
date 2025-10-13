import {bookingLogger, delay, nextUniqueId} from "./utils.mjs";

export class TransportTracker {
    constructor() {
        this.students = []
        this.trips = []
        this.bookins = []
        this.logs = []
    }

    addStudent({id, name}) {
        const isAlreadyAdded = this.students.find(s => s.id === id)

        if (isAlreadyAdded) {
            return "Student already exists"
        }

        this.students.push({id, name})

        return this.students
    }

    addTrip({id, from, to, date, seats}) {
        const isTripExist = this.trips.find(t => t.id === id)
        if (isTripExist) {
            return 'Trip Already Exists'
        }
        this.trips.push({
            id, from, to, date, seats
        })

        return this.trips
    }

    async bookTrip(studentId, tripId){
        await delay(1500)

        const trip = this.trips.find(t => t.id === tripId)

        const isBookingExists = this.bookins.some(b => b.studentId === studentId && b.tripId === tripId)

        if (isBookingExists){
            return "Student Already has a booking on this trip"
        }
        let status = 'success'
        if (trip.seats > 0) {
            const transactionId = await nextUniqueId()

            trip.seats--
            this.bookins.push({
                transactionId: transactionId(),
                studentId,
                tripId
            })
        }else {
            status = 'failed'
        }
        bookingLogger(this.logs, {
            tripId,
            studentId,
            status
        })


    }
}