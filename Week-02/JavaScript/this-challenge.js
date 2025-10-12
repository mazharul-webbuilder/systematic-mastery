/**
 * 🧠 Q1: this & Function Context
 *
 * Predict output .
 * Then explain why.
 * */

const person = {
    name: "Zayaan",
    greet: function () {
        console.log(`Hi, I’m ${this.name}`);
        setTimeout(function () {
            console.log(`Inside Timeout: ${this.name}`);
        }, 1000);
    }
};

person.greet();

// Output:
// Hi, I'm Zayaan
// Inside Timeout: undefined

/**
 * Explanation: greet used as an own object method, where this is referred to the person object.
 * Inside SetTimeout this is a normal function but as a closer which refer global this
* */

/**
 * 🧩 Q2: Fix it — make this work inside the timeout
 *
 * You can solve it 3 different ways (any one or all three).
 * Just make sure the output prints:
 * */

const personObjectFix = {
    name: 'Zayaan',
    greet: function (){
        console.log(`Hi, I'm ${this.name}`)
        const name = this.name
        setTimeout(() =>  console.log(`Inside Timeout: ${name}`), 1000)
        setTimeout(() =>  console.log(`Inside Timeout: ${this.name}`), 1000) // using an arrow function inherits the this value from the surrounding lexical scope
    }
}

personObjectFix.greet()