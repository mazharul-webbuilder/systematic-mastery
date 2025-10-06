// Q1. Sum of Array
const getSum = numbers => numbers.reduce((accumulator, number) => accumulator + number , 0)

// Q2. Find Maximum Number
function getMax(numbers){
   let max = numbers[0]

    numbers.forEach((number) => max =  number > max ? number : max)

    return max

}

// Q3. Filter Even Numbers

function getEvens(numbers){
    let evenNumbersArray = []
    numbers.forEach((number) => number%2 === 0 ? evenNumbersArray.push(number) : null)

    return evenNumbersArray
}

// Q4. Double Each Number

function double(numbers){
    return numbers.map((number) => number + number)
}

// Q5. Count Occurrences
function countOccurrences(numbers, occupant){
    let count = 0
    numbers.forEach((number) => number === occupant ? count++ : null)
    return count
}

