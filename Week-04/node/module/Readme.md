 // Examples of modules are: os, fs, events, http
 // module is not global object

// in browser its window
// in node its global

// where console.log, setTimeout(), clearTimeout, setInterval(), clearInterval()
// available

var sayHello = function (){
console.log('fcikum')
}

// This sayHello is globally accessible for different file also with same name get
// override
global.sayHello()

// Module
module.exports.log = log
module.exports.endPoint  = url

console.log(module)