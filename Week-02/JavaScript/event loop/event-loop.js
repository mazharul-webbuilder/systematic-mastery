/**
 * ⚡ JAVASCRIPT EVENT LOOP RULES (Execution Priority) ⚡
 * * The Event Loop processes tasks in batches based on priority:
 * * 1.  CALL STACK (Synchronous Code):
 * - Runs IMMEDIATELY until empty (e.g., console.log, new Promise constructor code).
 * - Blocks all other execution while running.
 * * 2.  MICROTASK QUEUE (High Priority):
 * - Runs COMPLETELY after the Call Stack is empty, and after *each* Macrotask.
 * - Tasks: Promise callbacks (.then(), .catch()), async/await continuations.
 * - Rule: New Microtasks added during this phase are run in the *same* cycle.
 * * 3.  MACROTASK QUEUE (Lower Priority):
 * - Runs ONLY when both the Call Stack AND Microtask Queue are empty.
 * - Tasks: setTimeout(), setInterval().
 * - Rule: Only ONE Macrotask is processed per loop cycle.
 * * PRIORITY FLOW:
 * [Call Stack] -> [Microtasks] -> [1 Macrotask] -> [Microtasks] -> [1 Macrotask]...
 */

// JS Async Challenge #1
function eventLoopExample1(){
    console.log("🥇 A"); // 1️⃣ Runs immediately (synchronous)

    setTimeout(() => console.log("🥈 B - setTimeout 0"), 0); // scheduled (macrotask queue)

    Promise.resolve().then(() => {
        console.log("🥉 C - promise 1"); // (microtask queue)
        setTimeout(() => console.log("🏅 D - inner setTimeout"), 0); // another macrotask
    });

    Promise.resolve().then(() => console.log("🎖️ E - promise 2")); // (microtask queue)

    console.log("🏆 F"); // 2️⃣ synchronous
}
// eventLoop()
// Output
// 🥇 A
// 🏆 F
// 🥉 C - promise 1
// 🎖️ E - promise 2
// 🥈 B - setTimeout 0
// 🏅 D - inner setTimeout

// JS Async Challenge #2
function eventLoopExample2(){
    console.log("1️⃣ Start");

    setTimeout(() => console.log("2️⃣ setTimeout"), 0);

    Promise.resolve().then(() => {
        console.log("3️⃣ Promise 1");
    });

    (async function () {
        console.log("4️⃣ Inside async start");
        await Promise.resolve();
        console.log("5️⃣ After await");
    })();

    console.log("6️⃣ End");

}
// eventLoopExample2()

// 1️⃣ Start
// 4️⃣ Inside async start
// 6️⃣ End
// 3️⃣ Promise 1
// 5️⃣ After await
// 2️⃣ setTimeout

// Challenge #3
function challenge3() {
    console.log("A");

    setTimeout(() => console.log("B - setTimeout 1"), 0);

    Promise.resolve().then(() => {
        console.log("C - Promise 1");
        return Promise.resolve().then(() => {
            console.log("D - Inner Promise");
        });
    }).then(() => {
        console.log("E - Promise 1 then chain");
    });

    (async () => {
        console.log("F - async start");
        await Promise.resolve();
        console.log("G - async after await");
    })();

    setTimeout(() => console.log("H - setTimeout 2"), 0);

    console.log("I - End");
}

// challenge3();

// Output
// A
// F - async start
// I - End
// C - Promise 1
// D - Inner Promise
// E - Promise 1 then chain
// G - async after await
// B - setTimeout 1
// H - setTimeout 2

/*
Step | Output                | Call Stack             | Microtask Queue (Prioritized)              | Macrotask Queue                          | Notes
-----|-----------------------|------------------------|--------------------------------------------|------------------------------------------|---------------------------------------------------------
0    |                       | function challenge3    |                                            |                                          | Start
1    | A                     | console.log("A")       |                                            |                                          | Sync code runs immediately.
2    |                       |                        |                                            | () => console.log("B - setTimeout 1")    | setTimeout 1 moved to Macrotask Queue.
3    |                       |                        | () => {console.log("C - Promise 1")}      | () => console.log("B - setTimeout 1")    | Promise 1 then moved to Microtask Queue.
4    | F - async start       | console.log("F...")    | () => {console.log("C - Promise 1")}      | () => console.log("B - setTimeout 1")    | Sync part of async IIFE runs.
5    |                       |                        | () => {console.log("C...")}, () => {console.log("G...")} | () => console.log("B - setTimeout 1")    | await Promise.resolve() moves the rest (G) to Microtask Queue.
6    |                       |                        | () => {console.log("C...")}, () => {console.log("G...")} | () => console.log("B..."), () => console.log("H...")   | setTimeout 2 moved to Macrotask Queue.
7    | I - End               | console.log("I...")    | () => {console.log("C...")}, () => {console.log("G...")} | () => console.log("B..."), () => console.log("H...")   | Sync code finishes. Call Stack is empty.
8    | C - Promise 1         | C callback             | () => {console.log("G...")}               | () => console.log("B..."), () => console.log("H...")   | Event Loop starts draining Microtask Queue. Inner Promise chain created.
9    |                       |                        | () => {console.log("G...")}, () => {console.log("D...")} | () => console.log("B..."), () => console.log("H...")   | Inner Promise then moved to Microtask Queue.
10   | D - Inner Promise     | D callback             | () => {console.log("G...")}, () => {console.log("E...")} | () => console.log("B..."), () => console.log("H...")   | D runs. Promise 1 then chain callback (E) added to Microtask Queue.
11   | G - async after await | G callback             | () => {console.log("E...")}               | () => console.log("B..."), () => console.log("H...")   | G runs.
12   | E - Promise 1 then chain| E callback           |                                            | () => console.log("B..."), () => console.log("H...")   | E runs. Microtask Queue is now empty.
13   | B - setTimeout 1      | B callback             |                                            | () => console.log("H - setTimeout 2")    | Event Loop moves to Macrotask Queue. B runs first.
14   | H - setTimeout 2      | H callback             |                                            |                                          | H runs next. Macrotask Queue is empty.
*/


// Challenge 4
function challenge4() {
    console.log(1);

    setTimeout(() => {
        console.log(2);
    }, 0);

    Promise.resolve().then(() => {
        console.log(3);

        setTimeout(() => {
            console.log(4);
        }, 0);
    });

    setTimeout(() => {
        console.log(5);

        Promise.resolve().then(() => {
            console.log(6);
        });
    }, 0);

    Promise.resolve().then(() => {
        console.log(7);
    });

    console.log(8);
}

// challenge4();

// Output
// 1
// 8
// 3
// 7
// 2
// 5
// 6
// 4


// Challenge 5
function challenge5() {
    console.log('Start');

    setTimeout(() => {
        console.log('Timeout A');
        Promise.resolve().then(() => console.log('Promise 1 in Timeout A'));
    }, 0);

    (async () => {
        console.log('Async 1');
        await null;
        console.log('Async 2');
    })();

    Promise.resolve().then(() => {
        console.log('Promise 2');
        setTimeout(() => console.log('Timeout B in Promise 2'), 0);
    });

    console.log('End');
}

// challenge5();

// Output
// Start
// Async 1
// End
// Async 2
// Promise 2
// Timeout A
// Promise 1 in Timeout A
// Timeout B in Promise 2

// Challenge 6
function challenge6() {
    console.log('Start');

    async function step1() {
        console.log('A1');
        await 1;
        console.log('A2');
    }

    (async () => {
        console.log('B1');
        await step1();
        console.log('B2');
    })();

    console.log('End');
}

// challenge6();

// Output
// Start
// B1
// A1
// End
// A2
// B2

// Challenge 7
function challenge7() {
    console.log('START');

    Promise.all([
        new Promise(resolve => {
            console.log('P1 Sync');
            resolve('R1');
        }),
        new Promise(resolve => {
            setTimeout(() => {
                console.log('P2 Timeout');
                resolve('R2');
            }, 0);
        })
    ]).then(results => {
        console.log('ALL Complete:', results);
    });

    setTimeout(() => {
        console.log('T1');
        Promise.resolve().then(() => console.log('T1 Promise'));
    }, 0);

    console.log('END');
}

// challenge7();

// Output
// START
// P1 Sync
// END
// T1
// T1 Promise
// P2 Timeout
// ALL Complete: ['R1', 'R2']

// Challenge 8
function challenge8() {
    console.log('Setup');

    setTimeout(() => {
        console.log('A - Timeout');
        Promise.resolve().then(() => console.log('B - Promise in A'));
    }, 0);

    setTimeout(() => {
        console.log('C - Timeout');
        Promise.resolve().then(() => console.log('D - Promise in C'));
    }, 0);

    Promise.resolve().then(() => console.log('E - Initial Promise'));

    console.log('Finish');
}

// challenge8();

// Output
// Setup
// Finish
// E - Initial Promise
// A - Timeout
// B - Promise in A
// C - Timeout
// D - Promise in c

// Challenge 9
async function challenge9() {
    console.log('Start A');

    await Promise.resolve();

    console.log('Start B');

    setTimeout(() => {
        console.log('Timeout C');
    }, 0);

    await Promise.resolve();

    console.log('Start D');
}

// console.log('Sync 1');
//
// challenge9();
//
// setTimeout(() => console.log('Timeout E'), 0);
// console.log('Sync 2');

// Output
// Sync 1
// Start A
// Sync 2
// Start B
// Start D
// Timeout E
// Timeout C

// Challenge 10
function challenge10() {
    console.log(1);

    setTimeout(() => {
        console.log(2);
        Promise.resolve().then(() => console.log(3));
        setTimeout(() => console.log(4), 0);
    }, 0);

    Promise.resolve().then(() => {
        console.log(5);
    });

    setTimeout(() => console.log(6), 0);

    console.log(7);
}

// challenge10();

// Output
// 1
// 7
// 5
// 2
// 3
// 6
// 4

// Challenge 11
function challenge11() {
    console.log('Sync 1');

    setTimeout(() => {
        console.log('T1 (0ms)');
        Promise.resolve().then(() => console.log('P1 in T1'));
    }, 0);

    Promise.resolve().then(() => {
        console.log('P2');
    });

    setTimeout(() => {
        console.log('T2 (50ms)');
    }, 50);

    console.log('Sync 2');
}

// challenge11();

// Output
// Sync1
// Sync 2
// P2
// T1 (0ms)
// P1 in T1
// T2 (50ms)

// Challenge 12
async function outer() {
    console.log('O1');
    await inner();
    console.log('O2');
}

async function inner() {
    console.log('I1');
    await Promise.resolve();
    console.log('I2');
}

// console.log('S1');
// outer();
// Promise.resolve().then(() => console.log('P1'));
// console.log('S2');

// Output
// S1
// 01
// I1
// S2
// I2
// P1
// 02

// Challenge 13
function challenge13(){
    console.log("1️⃣ Start");

    setTimeout(() => console.log("2️⃣ setTimeout 1"), 0);

    Promise.resolve().then(() => {
        console.log("3️⃣ Promise 1");
        setTimeout(() => console.log("4️⃣ setTimeout inside Promise"), 0);
    });

    (async () => {
        console.log("5️⃣ Async start");
        await Promise.resolve();
        console.log("6️⃣ Async after await");
    })();

    console.log("7️⃣ End");

    setTimeout(() => console.log("8️⃣ setTimeout 2"), 0);
}
// challenge13()

// Output
// Start
// Async Start
// End
// Promise 1
// Async after await
// setTimeout 1
// Set Timeout 2
// setTimeout inside Promise

// Challenge 14
function challenge14(){
    console.log("1️⃣ Start");

    setTimeout(() => console.log("2️⃣ setTimeout 1"), 0);

    Promise.resolve().then(() => {
        console.log("3️⃣ Promise 1");
        setTimeout(() => console.log("4️⃣ setTimeout inside Promise"), 0);
        Promise.resolve().then(() => console.log("5️⃣ Inner Promise 1"));
    });

    (async () => {
        console.log("6️⃣ Async start");
        await Promise.resolve();
        console.log("7️⃣ Async after await");
        Promise.resolve().then(() => console.log("8️⃣ Promise inside async"));
    })();

    queueMicrotask(() => console.log("9️⃣ Microtask queueMicrotask"));

    console.log("🔟 End");

    setTimeout(() => console.log("1️⃣1️⃣ setTimeout 2"), 0);
}
challenge14()

// Output
// Start
// Async start
// End
// Promise 1
// async after await
// microtask queueMicrotask
// Inner Promise 1
// Promise Inside async
// SetTimeout 1
// SetTimeout 2
// SetTimeout inside Promise









































