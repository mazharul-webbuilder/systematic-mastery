// This is a normal function declaration
function greet(name, age = 0){
    return `Hello Zayaan, you are ${age} years old`
}

// This is a normal function expression
function squareDec1(number){
    return number * number
}

// This is an arrow function
const greetUsingArrow = (name, age = 0) => `Hello ${name}, you are ${age} years old`

// This is an arrow function expression
const squareExpr = (number) => number * number


console.log(greet('Zayaan', 1.5))
console.log(squareDec1(5))
console.log(greetUsingArrow('Zayaan', 1.5))
console.log(squareExpr(5))