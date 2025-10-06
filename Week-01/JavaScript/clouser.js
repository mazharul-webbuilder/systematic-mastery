// P-1
function createCounter() {
    let count = 0
    return {
        increment: () => count++, getCount: () => count
    }
}

const counter = createCounter();
counter.increment();
counter.increment();
console.log(counter.getCount()); // 2

// P-2
function createTexCalculator(rate){
    return (amount) => rate*100/amount;
}

const serviceTax = createTexCalculator(0.10); // 10% tax
console.log(serviceTax(200))


