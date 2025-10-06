
// P-1
for (let number = 1; number <= 20; number++) {
    if (number % 3 === 0 && number % 5 === 0) {
        // console.log("FizzBuzz")
    } else if (number % 3 === 0) {
        // console.log("Fizz")
    } else if (number % 5 === 0) {
        // console.log("Buzz")
    } else {
        //  console.log(number)
    }
}

// P-2
const p2name = 'Zayaan'
let p2ageInMonth = 11
let p2isEnrolled = false
const p2courses = ["Math", "CS", "English"]
const p2profile = {
    id: 101,
    dept: "CSE",
    address: 'Cumilla'
}

p2ageInMonth++
p2isEnrolled = true
p2courses.push("Physics")
p2profile.dept = 'EEE'
p2profile.address = 'Dhaka'

// P-3
const p3productName = 'Sweet Potato'
let p3price = 250

p3price += 50

const product = {
    name: p3productName,
    price: p3price,
    inStock: null
}

product.discount = false

// P-4
const cart = [
    {
        id: 1,
        name: 'X',
        price: 10,
        qty: 10
    },
    {
        id: 2,
        name: 'Y',
        price: 20,
        qty: 20
    },
]

function addToCart(product) {
    if (product.hasOwnProperty("id") &&
        product.hasOwnProperty("name") &&
        product.hasOwnProperty("price") &&
        product.hasOwnProperty("qty")

    ) {
        const existingProduct = cart.find((p) => p.id === product.id)

        if (existingProduct) {
            product = existingProduct
            product.qty++
        }

        cart.push(product)
    } else {
        console.log("Something went wrong")
    }
}
function removeFromCart(id){
    const productIndex = cart.findIndex((p) => p.id === id)
    if (productIndex >= 0){
        cart.splice(productIndex, 1)
    }
}

function getCartTotal() {
    let total = 0
    cart.forEach((p) => total += p.price * p.qty)
    return total
}

addToCart({
    id: 3,
    name: 'Z',
    price: 30,
    qty: 30
})
removeFromCart(3)

const totalPrice = getCartTotal()

console.log(cart, totalPrice)

console.log(cart.length ? "Cart total is " + cart.length : 'Cart is empty')










