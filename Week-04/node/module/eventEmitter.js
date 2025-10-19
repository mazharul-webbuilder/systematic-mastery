const EventEmitter = require('events')

const emitter = new EventEmitter()


// Example:  1

// Register Listener
emitter.on('messageLogged', function () {
    console.log("listener called")
})

// Raise an event called messageLogged
// Making a noise, produce - signalling something has happened in application
emitter.emit('messageLogged')

// Example: 2
emitter.on('messageLoggedWithData', function (eventArg){
    console.log(eventArg)
})

emitter.emit('messageLoggedWithData', {
    id: 1,
    url: 'https://chatgpt.com/c/68f4b04e-9088-8320-8126-eb17eb57f8e9'
})

