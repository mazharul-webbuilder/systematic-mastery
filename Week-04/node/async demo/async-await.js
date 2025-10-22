
const p1 = new Promise((res) => {
    setTimeout(() => {
        console.log('Async Operation 1')
        res(10)
    }, 2000)
})

const p2 = new Promise((res, rej) => {
    setTimeout(() => {
        console.log('Async Operation 2')
        rej(new Error('Something went wrong'))
    }, 2000)
})

const p1res = await p1;
const p2Res = await p2