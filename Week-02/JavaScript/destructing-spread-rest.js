/**
 * Destructuring in JavaScript is a simple way to unpack values from arrays or properties from objects into distinct variables.
 * It makes code cleaner and easier to read.
 * */

// Object Destructuring
const person = {
    name: 'Zayaan', age: 1.5
}

const {
    name,
    age
} = person // name: 'Zayaan', age: 1.5

const {
    name: fullName,
    age: yearsOld
} = person // fullName: 'Zayaan', yearsOld: 1.5

// Array Destructuring
const colors = ['red', 'green', 'blue'];
const [firstColor, secondColor] = colors // firstColor: 'red', secondColor: 'green'

console.log(firstColor, secondColor)

const data = ['a', 'b', 'c', 'd'];
const [first, , third] = data // first: 'a', third: 'c'

// Using the Rest Pattern (...)
const list = [1, 2, 3, 4, 5];
const [one, , three, ...restOfList] = list // one: 1, three: 3, restOfList: [4, 5]


// Default Values

//Array Default
const numbers = [10];
const [x, y = 5] = numbers // x: 10, y: 5

console.log(x, y)

// Object Default
const settings = {theme: 'dark'};
const {theme, font = 'arial'} = settings // theme: 'dark', font: 'arial'

console.log(theme, font)

// Spread — expands arrays/objects
const numbers2 = [1, 2, 3];
const moreNumbers = [...numbers2, 4, 5]; // moreNumbers: [1, 2, 3, 4, 5]

console.log(moreNumbers); // [1, 2, 3, 4, 5]

// Also works for objects
const baseUser = {name: "Zayaan", age: 1};
const extendedUser = {...baseUser, country: "Bangladesh"}; // extendedUser: { name: "Zayaan", age: 1, country: "Bangladesh" }

console.log(extendedUser);
