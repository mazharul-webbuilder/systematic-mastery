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


console.log(sumArray([1, 2, 3, 4, 'hello', 10]))