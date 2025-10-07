// Problem 1 - Sum Array
function sumArray(arr) {
    return arr.reduce((result, item) => {

        if (typeof item === "number") {
            console.log(result, item)
            return result += item
        } else {
            console.log(result, item)

            return result = result
        }

    }, 0)
}

// Find the Maximum Number
function findMaximumNumber(arr){
    return arr.reduce((max, item) => {
        return item > max ? item : max
    }, arr[0])
}


// Reverse arr
function reverseArr(arr){
    let lastItemIndex = arr.length - 1
    return arr.reduce((reverseArr, item) => {
        reverseArr.push(arr[lastItemIndex])
        lastItemIndex--
        return reverseArr
    }, [])
}
