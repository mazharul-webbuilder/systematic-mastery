// Challenge 1
function findDuplicates(arr){
   return [... new Set(arr.filter( (item) => {
       const numberOfRancour = arr.reduce((occur, innerItem) => {
           if (innerItem === item){
               return ++occur
           }
           return occur
       }, 0)
       return numberOfRancour > 1
   }))]
}

console.log(findDuplicates([1, 1, 1, 2, 2, 3]))