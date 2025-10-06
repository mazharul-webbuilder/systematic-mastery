// Q1 - Variable & Data Type
const studentName = "Zayaan"
let age = 13
let skills = ['make daddy happy', 'make mamma happy', 'playing with toys']
const profile = {
    name : studentName,
    age: age,
    skills: skills
}

// Q2 - Operator Logic
const isEligible = (age) => age >= 18 ?  "Eligible" : "Not Eligible"

// Q3 - Array + Object Manipulation

const cart = [
    { name: "Apple", price: 30, qty: 2 },
    { name: "Banana", price: 10, qty: 5 }
];

function getCartTotal(cart){
    return cart.reduce(function (accumulator, cartItem){
        return accumulator + (cartItem.qty * cartItem.price)
    }, 0)
}

// Q4 Function + Closure
function createCounter(){
    let count = 0

    return {
        increment: () => count++,
        getCount: () => count
    }
}

// Q5 — Higher-Order Function
function createDiscountApplier(rate){
    return (price) => price - rate*price;
}
const apply10 = createDiscountApplier(0.10);
