// Step 2 — Simple async queue simulation
class MiniQueue {
    constructor() {
        this.queue = [];
        this.running = false;
        this.onProcess = 0
    }

    add(task) {
        this.queue.push(task);
        if (this.onProcess === 2) return
        this.onProcess++
        this.#runNext();
    }

    async #runNext() {
        if (this.running || this.queue.length === 0) return;
        this.running = true;
        const task = this.queue.shift();
        await task(); // waits for the async task
        this.running = false;
        this.onProcess--
        this.#runNext();
    }
}

// test
const q = new MiniQueue();
q.add(async () => { console.log('Task 1'); await new Promise(r => setTimeout(r, 500)); console.log('Task 1 done'); });
q.add(async () => { console.log('Task 2'); await new Promise(r => setTimeout(r, 300)); console.log('Task 2 done'); });
q.add(async () => { console.log('Task 3'); await new Promise(r => setTimeout(r, 300)); console.log('Task 3 done'); });
q.add(async () => { console.log('Task 4'); await new Promise(r => setTimeout(r, 300)); console.log('Task 4 done'); });