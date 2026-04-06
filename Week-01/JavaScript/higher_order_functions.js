// A higher order function in JavaScript is any function that either takes another funcions
// as an argument or returns a function as its result. This makes functions behave like first class citizens

// Takes functions as argument (Often called callbacks)
// Returns functions as values (closures or factory functions)


// Ex: Passing a Function as an Argument
function registrationGreetingMessage(name){
    return `Welcome ${name} to the seller flow`
}

function userRegistrationRequest(registrationCallback){
    let userName = 'Zayaan'

    return registrationCallback(userName)
}

let greetingMessage = userRegistrationRequest(registrationGreetingMessage)

console.log(greetingMessage) // Welcome Zayaan to the seller flow

// Ex: Returning a Function
function multiplier(factor)  {
    return function (number) {
        return factor * number
    }
}

const double = multiplier(2);
console.log(double(5)); // 10
console.log(double(15)); // 30