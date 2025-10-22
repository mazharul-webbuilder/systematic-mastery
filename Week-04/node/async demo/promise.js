// Three ways of asynchronous program
// 1 Callbacks
// 2 Promises
// 3 Async/await (syntactic sugar of Promise)
console.log('Before')

getUser(1, function (user) {
    getRepositories(user.githubUserName, function (repo){
        console.log(repo)
        // Callback hell
    })

})
console.log('After')


function getUser(id, callback) {
    setTimeout(() => {
        console.log("Reading a user from a database")
        callback({
            id: id,
            githubUserName: 'mazharul-jatri'
        })
    }, 1000)

}

function getRepositories(username, callback){
    setTimeout(() => {
        console.log('Reading from github')
        callback({
            username,
            repo: ['repo1', 'repo2']
        })
    }, 2000)
}

// Promise api
const p = Promise.resolve(1)
p.then(result => console.log(result))

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

Promise.all([p1, p2]).then((result) => console.log(result))
Promise.race([p1, p2])