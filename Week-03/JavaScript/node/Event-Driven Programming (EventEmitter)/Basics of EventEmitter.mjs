import EventEmitter from 'node:events';

const emitter = new EventEmitter();

// Subscribe to event
emitter.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

// Emit event
emitter.emit('greet', 'Zayaan');

// Notes:
//
//     .on() → listens to event multiple times
//
//     .once() → listens only for next occurrence
//
//     .emit() → triggers the event
