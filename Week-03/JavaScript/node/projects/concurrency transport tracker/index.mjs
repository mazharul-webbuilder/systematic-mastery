import TripManager from "./trips.mjs";
import BookingManager from "./booking.mjs";
import Logger from "./logger.mjs";

const logger = new Logger();
const trips = new TripManager();
const bookings = new BookingManager(logger);

// Add trips
trips.addTrip({ id: 1, from: "Home", to: "NSU", date: "2025-10-20", seats: 2 });
trips.addTrip({ id: 2, from: "NSU", to: "Home", date: "2025-10-21", seats: 1 });

// Simulate students booking concurrently
(async () => {
    const t1 = trips.getTrip(1);
    const t2 = trips.getTrip(2);

    await Promise.all([
        bookings.book(1, t1),
        bookings.book(2, t1),
        bookings.book(3, t2),
        bookings.book(1, t2) // Will fail if seats = 1
    ]);

    console.log("Trips:", trips.listTrips());
    console.log("Bookings:", bookings.bookings);
    console.log("Logs:", logger.getLogs());
})();
