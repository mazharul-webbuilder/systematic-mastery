// Q1 - Timers
function greetAfterDelay(name) {
    setTimeout(function () {
        console.log(`Hello ${name}`)
    }, 1000)
}

// Q2 — Callback
function loadStudentData(callback) {
    console.log('Loading student.....')
    setTimeout(() => {
        callback()
    }, 2000)
}

function getStudent() {
    console.log('Loaded Student Data')
}

// Q3 — Promise
function fetchCourses() {
    return new Promise((resolve) => setTimeout(() => resolve(["Math", "English", "CS"]), 1500))
}

fetchCourses().then((courses) => console.log(courses))

// Q4 — Promise with Error Handling
function checkLogin(isLoggedIn) {
    return new Promise((resolve, reject) => {
        if (isLoggedIn) {
            resolve("Login Successful")
        } else {
            reject("Login Failed")
        }
    })
}

checkLogin(false).then((msg) => console.log(msg)).catch((err) => console.log(err))

// Q5 — Async/Await
async function getCourses() {
    try {
        console.log("Fetching coursed....")
        const courses = await fetchCourses()
        console.log(courses)
    } catch (err) {

    }
}

getCourses()