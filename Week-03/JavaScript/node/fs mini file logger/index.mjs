import SmartTracker from "./tracker.mjs";

const tracker = new SmartTracker()
await tracker.startTrip(1)
console.log('1sst done')
await tracker.startTrip(2)
console.log('2nd Done')
