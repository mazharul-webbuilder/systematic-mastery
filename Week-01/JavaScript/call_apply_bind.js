
const person = { name: "Mazhaurl" }

// Call
// Pass arguments as comma separated values
greet.call(person, "JS") // Hello Mazhaurl, in JS
// Apply
// Pass arguments as an array
greet.apply(person, ['php']) // Hello Mazhaurl, in php
// Bind
// pass arguments as comma separated values
// Returns a new function with the context bound
const boundFn = greet.bind(person, "Python")
boundFn() // Hello Mazhaurl, in Python