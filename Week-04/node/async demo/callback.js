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