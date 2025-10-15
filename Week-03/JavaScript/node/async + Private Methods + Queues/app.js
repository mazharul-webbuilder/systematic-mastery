// Step 1 — Quick private method refresher

class Example {
    #privateFunc() {
        console.log('This is private');
    }

    callPrivate() {
        this.#privateFunc();
    }
}

const e = new Example();

e.callPrivate(); // ✅ works
// e.#privateFunc(); // ❌ Error: cannot access private

