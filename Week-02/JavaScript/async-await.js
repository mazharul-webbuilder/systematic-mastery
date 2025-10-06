function fetchStudent(){
    return new Promise((resolve) => {
        setTimeout(()=> {
            resolve({name: 'Zayaan', age: 11})
        }, 5000)
    })
}

async function getStudentData(){
    console.log("Fetching Student Data")
    const studentData = await fetchStudent()

    console.log(studentData)
}

// getStudentData()

// Fetch Api
async function getUsers(){
  try{
      const response = await fetch("https://jsonplaceholder.typicode.com/users")
      const users = await response.json()

      console.log(users)
  }catch (err){
      console.error("Failed to fetch users")
  }
}

getUsers()