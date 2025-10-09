/**
 * Destructuring in JavaScript is a simple way to unpack values from arrays or properties from objects into distinct variables.
 * It makes your code cleaner and easier to read.
 * */

// Object Destructuring
const person = {name: 'Zayaan', age: 1}

const {name, age} = person
const {name: fullName, age: yearsOld} = person

// Array Destructuring
const colors = ['red', 'green', 'blue'];
const [firstColor, secondColor] = colors

console.log(firstColor, secondColor)

const data = ['a', 'b', 'c', 'd'];
const [first, , third] = data

// Using the Rest Pattern (...)
const list = [1, 2, 3, 4, 5];
const [one, , three, ...restOfList] = list


// Default Values

//Array Default
const numbers = [10];
const [x, y = 5] = numbers

console.log(x, y)

// Object Default
const settings = {theme: 'dark'};
const {theme, font = 'arial'} = settings

console.log(theme, font)

// Spread — expands arrays/objects
const numbers2 = [1, 2, 3];
const moreNumbers = [...numbers2, 4, 5];

console.log(moreNumbers); // [1, 2, 3, 4, 5]

// Also works for objects
const baseUser = { name: "Zayaan", age: 1 };
const extendedUser = { ...baseUser, country: "Bangladesh" };

console.log(extendedUser);
// { name: "Zayaan", age: 1, country: "Bangladesh" }


// Challenge 1
function getProfileSummary(userProfile) {
    const {firstName, address: {city, country}} = userProfile
    console.log(`${firstName} lives in ${city}, ${country}`)

}

getProfileSummary(
    {
        id: 42,
        firstName: 'Jasmine',
        lastName: 'Patel',
        age: 28,
        address: {
            street: '123 Main St',
            city: 'London',
            country: 'UK'
        },
        preferences: ['email', 'sms']

    })

// Challenge 2: Processing Location Data 🗺️
function getLocationInfo(location) {
    const [lat, long, , , label = 'Unknown'] = location

    console.log(`Lat: ${lat}, Long: ${long}, Label: ${label}`)
}

getLocationInfo([40.7128, -74.0060, 15, 'New York'])

// Challenge 3
function getApiData(response) {
    const {title, tags: secondaryTag, metrics: {views}, ...restData} = response

    console.log(title, secondaryTag, views, restData)
}


getApiData({
    id: 'abc1234',
    title: 'Learn Destructuring in 5 Minutes',
    author: 'Gemini',
    tags: ['javascript', 'es6', 'tutorial', 'code'],
    metrics: {
        views: 9876,
        likes: 450,
        shares: 120
    }
})

// Q3 — merge array
function mergeArrays(...arrays){
    const mergedArr = arrays.reduce((mergedArray, item) => {
        return [...mergedArray, ...item]
    }, [])

    console.log(mergedArr)
}
mergeArrays([1,2], [3,4], [5]) // [1,2,3,4,5]

