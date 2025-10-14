// index.mjs
import { TransportTracker } from './tracker.mjs';

const tracker = new TransportTracker();

tracker.addStudent({ id: 1, name: 'Zayaan' });
tracker.addStudent({ id: 2, name: 'Lammim' });

tracker.addTrip({ id: 1, from: 'Home', to: 'NSU', date: '2025-10-20', seats: 2 });
tracker.addTrip({ id: 2, from: 'NSU', to: 'Home', date: '2025-10-21', seats: 1 });

// async booking test
(async () => {
    await tracker.bookTrip(1, 1);
    await tracker.bookTrip(2, 1);
    await tracker.bookTrip(2, 2);
    await tracker.bookTrip(1, 2);


    console.log('in main thred')
    console.log(tracker.students);
    console.log(tracker.trips);
    console.log(tracker.bookings);
    console.log(tracker.logs);
})();


// 1

14956107285