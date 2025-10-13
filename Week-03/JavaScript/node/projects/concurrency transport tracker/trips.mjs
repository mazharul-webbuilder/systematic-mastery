export default class TripManager {
    constructor() {
        this.trips = [];
    }

    addTrip(trip) {
        this.trips.push({ ...trip });
    }

    listTrips() {
        return this.trips;
    }

    getTrip(tripId) {
        return this.trips.find(t => t.id === tripId);
    }
}
