import EventEmitter from "node:events";

class AsyncEmitter extends EventEmitter {
    async emitAsync(event, ...args) {
        const listeners = this.listeners(event);
        const results = listeners.map(fn => fn(...args));
        return Promise.all(results);
    }
}

const emitter = new AsyncEmitter();

emitter.on('start', () => console.log('Started'));
emitter.on('progress', async () => {
    console.log('Progressing');
    await new Promise(res => setTimeout(res, 1000));
    console.log('Progress done');
});
emitter.on('done', () => console.log('Done'));

await emitter.emitAsync('start');
await emitter.emitAsync('progress');
await emitter.emitAsync('done');
