// 🧠 LEVEL 2 ASYNC JS EXAM

// Q1 — Promise Chaining
function getStudent() {
    return new Promise((resolve) => setTimeout(() => resolve({name: 'Zayaan', id: 101}), 1000))
}

function getStudentCourses() {
    return new Promise((resolve) => setTimeout(() => resolve(["Math", "Science"]), 1000))
}


getStudent()
    .then((student) => {
        console.log(student)
        return getStudentCourses()
    })
    .then((courses) => {
        console.log(courses)
    })
    .catch((err) => console.error(err));

// Q2 — Promise.all
function fetchUser() { return new Promise(res => setTimeout(() => res("User Loaded"), 1000)) }
function fetchPosts() { return new Promise(res => setTimeout(() => res("Posts Loaded"), 2000)) }
function fetchComments() { return new Promise(res => setTimeout(() => res("Comments Loaded"), 1500)) }

const data = Promise.all([fetchUser(), fetchPosts(), fetchComments()]).then((values) => {
    console.log(values)
})

// Q3 - Combining Everything
function fetchUserForFive(){
    return new Promise(resolve => setTimeout(() => resolve('User loaded'), 1000))
}

function fetchUserPostForFive(){
    return new Promise(resolve => setTimeout(() => resolve("User Post loaded"), 5000))
}

function fetchUserCommentsForFive(){
    return new Promise(resolve => setTimeout(() => resolve("User Comment loaded"), 5000))
}

async function loadUserDataForFive(){
    const user  =  await fetchUserPostForFive();

    const [posts, comments] = await Promise.all([
        fetchUserPostForFive(),
        fetchUserCommentsForFive()
    ])

}

loadUserDataForFive();



