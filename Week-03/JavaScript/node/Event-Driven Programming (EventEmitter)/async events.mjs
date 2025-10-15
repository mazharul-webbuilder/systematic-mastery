import EventEmitter from 'node:events'

const emitter = new EventEmitter()

emitter.on('asyncGreet', async (name) => {
    await new Promise(res => setTimeout(res, 500))
    console.log(`Async hello to ${name}`)
})

console.log('Before emit')
emitter.emit('asyncGreet', 'Zayaan')
console.log('After Emit')