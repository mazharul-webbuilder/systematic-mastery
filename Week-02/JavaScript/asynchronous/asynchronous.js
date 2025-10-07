// Asynchronous behavior
function loadData() {
    console.log("Fetching student info")

    setTimeout(function () {
        console.log("Student data loaded")
        setTimeout(function () {
            console.log("Processing Completed")
        }, 1000)
    }, 2000)
}

// Callbacks

function loadDataUsingCallback(callback) {
    console.log("Fetching student info")

    setTimeout(() => {
        console.log("Student data loaded")
        setTimeout(callback, 1000)
    }, 2000)
}

function processData() {
    console.log("Processing Completed")
}


// Promise
function loadDataUsingPromise() {
    console.log("Fetching student info")
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Student data loaded')
            resolve("Processing Completed")
        }, 2000)
    })
}

// loadDataUsingPromise().then((message) => console.log(message))
//     .catch((error) => console.log(error))
//     .finally(() => console.log('Task Completed'))

// Promise
function fetchStudent(){
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve({name: 'Zayaan', age: 11}), 1500)
    })
}

// fetchStudent().then((student) => {
//     console.log(`Student fetched: ${student.name} ${student.age}`)
// }).catch()
// .finally()


// Promise
function checkAge(student){
    return new Promise((resolve, reject) => {
        if (student.age >=18){
            resolve("Eligible")
        }else {
            reject("Not Eligible")
        }
    })
}

// checkAge({age: 20}).then((msg) => console.log(msg)).catch((err) => console.log(err))

// Promise All
const studentInfo = new Promise.all()