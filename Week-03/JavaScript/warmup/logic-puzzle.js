function mystery(arr) {
    return arr
        .map(x => x * 2) // 1, 4, 6, 8, 10, 12
        .filter(x => x % 3 === 0) // 6, 12
        .reduce((acc, x) => acc + x, 0); // 18
}

const numbers = [1, 2, 3, 4, 5, 6];
console.log(mystery(numbers));


