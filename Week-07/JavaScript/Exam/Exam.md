# JavaScript Skill Gap Assessment Exam

> **For:** Backend Software Engineer (PHP/Laravel background)  
> **Coverage:** Week-01 & Week-02 JavaScript Mastery Content  
> **Duration:** 60-90 minutes  
> **Instructions:** Answer all questions. Write code where requested. Use comments to explain your reasoning.

---

## Section A: Fundamentals & Data Types (15 Points)

### A1. Variable Scope & Hoisting (3 points)

What will be the output of the following code? Explain why.

```javascript
console.log(a);
var a = 10;
console.log(b);
let b = 20;
```

**Your Answer:** 
Output: undefined, undefined
Reason: JavaScript run on top to bottom manner, here variable a is accessed before declaration, so it is undefined. b is also undefined because it accessed before declaration.


---

### A2. Primitive vs Reference Types (4 points)

Given your PHP background (where variables are copied by value), predict the output and explain the JavaScript behavior:

```javascript
// Part 1
let x = 10;
let y = x;
x = 20;
console.log(x, y);

// Part 2
let arr1 = [1, 2, 3];
let arr2 = arr1;
arr2.push(4);
console.log(arr1, arr2);

// Part 3
let obj1 = { name: "Zayaan" };
let obj2 = { ...obj1 };
obj2.name = "Lammim";
console.log(obj1.name, obj2.name);
```

**Your Answer:**

--- Output: 10 20
--- Output: 1,2,3,4 1,2,3,4
--- Output: Zayaan Lammim
In JavaScript, primitive types are copied by value, while reference types are copied by reference. The code above shown
has done shallow copy of object where name is changed in obj2 but obj1 is not affected.
If there were a reference function inside original object, then it would have been copied by reference and changed on
copied object will also be changed in original object.

### A3. Type Coercion Traps (4 points)

PHP developers often trip on JavaScript's loose typing. What will these output?

```javascript
console.log(5 == "5");
console.log(5 === "5");
console.log(null == undefined);
console.log(null === undefined);
console.log([] == false);
console.log([] === false);
```

**Your Answer:** Output: true, false, true, false, true, false

---

### A4. Symbol Uniqueness (4 points)

Explain the output and practical use case for `Symbol`:

```javascript
const sym1 = Symbol('user');
const sym2 = Symbol('user');
const obj = {
    [sym1]: 'Value 1',
    [sym2]: 'Value 2',
    name: 'Zayaan'
};

console.log(sym1 === sym2);
console.log(obj[sym1]);
console.log(Object.keys(obj));
console.log(Object.getOwnPropertySymbols(obj));
```

**Your Answer:** Output: false, Value 1, [ 'name' ], [ 'Symbol(user)', 'Symbol(user)' ].
Explanation: Symbol is a primitive type that is unique and cannot be duplicated. It is used as a key for object properties.

---

## Section B: Functions & Closures (20 Points)

### B1. Function Declarations vs Expressions (5 points)

Explain the difference and when each would throw an error:

```javascript
// Scenario 1
sayHello();
function sayHello() {
    console.log('Hello');
}

// Scenario 2
greet();
const greet = function() {
    console.log('Hi');
};

// Scenario 3
const arrowGreet = () => console.log('Hey');
arrowGreet();
```

**Your Answer:** Output: Hello and then thrown error
Explanation: Function declarations are hoisted, while function expressions are not. Scenario 2 will throw an error because greet is not defined.
Scenario 3 will work because arrow functions are not hoisted.

---

### B2. Closure Implementation (8 points)

Implement a `createRateLimiter` function using closures that:
- Allows max 3 calls within a 10-second window
- Returns "Allowed" or "Rate limit exceeded"
- Tracks timestamps internally (hidden from outside)

**Your Code:**

```javascript
function createRateLimiter(maxCalls, windowMs) {
    const calls = [];

    return function () {
        const now = Date.now();

        // Remove timestamps older than windowMs
        while (calls.length && now - calls[0] > windowMs) {
            console.log(now, calls[0], now - calls[0])
            calls.shift(); // Remove all calls that expired
        }

        if (calls.length < maxCalls) {
            calls.push(now);
            console.log("Request Status: Allowed");
        } else {
            console.log("Request Status: Rate limit exceeded");
        }
}

// Test
    const limiter = createRateLimiter(3, 10000); // max 3 calls per 10s
    limiter(); // Allowed
    limiter(); // Allowed
    limiter(); // Allowed
    limiter(); // Rate limit exceeded
    setTimeout(() => limiter(), 11000); // Allowed again after 11s
```

---

### B3. Higher-Order Function (7 points)

Create a `createValidator` factory that returns validation functions:

```javascript
// Should support: minLength, maxLength, isEmail, required
// Usage:
const validatePassword = createValidator(['required', 'minLength:8']);
const validateEmail = createValidator(['required', 'isEmail']);

console.log(validatePassword('secret'));   // false
console.log(validatePassword('mypassword')); // true
console.log(validateEmail('invalid'));       // false
console.log(validateEmail('test@example.com')); // true
```

**Your Code:**

```javascript
function createValidator(rules) {
    return function (value) {
        for (let rule of rules) {
            // Handle rules with parameters (e.g., "minLength:8")
            let [ruleName, param] = rule.split(":");

            switch (ruleName) {
                case "required":
                    if (value === null || value === undefined || value === "") {
                        return false;
                    }
                    break;

                case "minLength":
                    if (value.length < parseInt(param)) {
                        return false;
                    }
                    break;

                case "maxLength":
                    if (value.length > parseInt(param)) {
                        return false;
                    }
                    break;

                case "isEmail":
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(value)) {
                        return false;
                    }
                    break;

                default:
                    throw new Error(`Unknown rule: ${ruleName}`);
            }
        }
        return true; // Passed all rules
    };
}

```

---

## Section C: this Keyword & Context (15 Points)

### C1. Predict & Fix (5 points)

What will this output? Fix it so both logs show "Zayaan":

```javascript
const person = {
    name: 'Zayaan',
    greet: function() {
        console.log(`Hi, I'm ${this.name}`);
        setTimeout(function() {
            console.log(`Delayed: ${this.name}`);
        }, 100);
    }
};
person.greet();
```

**Your Answer:**

---

### C2. Call, Apply, Bind (5 points)

Explain the difference and rewrite using each method:

```javascript
function introduce(greeting, punctuation) {
    console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const user = { name: 'Zayaan' };

// Your implementations:
// 1. Using .call()
// 2. Using .apply()
// 3. Using .bind()
```

**Your Answer:**

---

### C3. Arrow Functions vs Regular Functions (5 points)

Why does this code behave unexpectedly? Fix it.

```javascript
const counter = {
    count: 0,
    increment: () => {
        this.count++;
        console.log(this.count);
    },
    decrement: function() {
        this.count--;
        console.log(this.count);
    }
};

counter.increment(); // NaN or error
counter.decrement(); // Works
```

**Your Answer:**
Explanation: Arrow functions do not have their own this context. They inherit it from the parent scope. In this case, this.count is undefined.

---

## Section D: Arrays & Array Methods (15 Points)

### D1. Map, Filter, Reduce Mastery (8 points)

Given the data structure similar to what you might process in a Laravel backend:

```javascript
const orders = [
    { id: 1, customer: 'Zayaan', amount: 250, status: 'delivered', items: 3 },
    { id: 2, customer: 'Lammim', amount: 300, status: 'pending', items: 5 },
    { id: 3, customer: 'Zayaan', amount: 150, status: 'delivered', items: 2 },
    { id: 4, customer: 'Rakib', amount: 400, status: 'cancelled', items: 1 },
    { id: 5, customer: 'Lammim', amount: 200, status: 'delivered', items: 4 }
];
```

Write single expressions (chained if needed) to get:

1. **Total revenue from delivered orders only**
2. **Array of unique customer names who have pending orders**
3. **Average items per delivered order**
4. **Object with customer names as keys and their total spending as values**

**Your Code:**

```javascript
// 1. Total delivered revenue:

// 2. Unique customers with pending orders:

// 3. Average items per delivered order:

// 4. Customer spending summary:

```

---

### D2. Find Duplicates (7 points)

Implement a function that finds all duplicate values in an array (without using Set initially, then show the Set version):

```javascript
function findDuplicates(arr) {
    // Your implementation without Set
}

function findDuplicatesWithSet(arr) {
    // Your implementation with Set
}

console.log(findDuplicates([1, 2, 2, 3, 3, 3, 4])); // [2, 3]
```

**Your Code:**

```javascript

```

---

## Section E: Destructuring, Spread & Rest (10 Points)

### E1. Nested Destructuring (5 points)

Extract the specific values from this API response:

```javascript
const apiResponse = {
    status: 200,
    data: {
        user: {
            id: 101,
            profile: {
                name: 'Zayaan',
                address: {
                    city: 'Dhaka',
                    country: 'Bangladesh'
                }
            },
            preferences: {
                theme: 'dark',
                notifications: true
            }
        },
        meta: { timestamp: '2024-01-15' }
    }
};

// Write a single destructuring statement to extract:
// - userName, city, country, theme
// Ignore everything else
```

**Your Code:**

```javascript

```

---

### E2. Spread & Rest in Practice (5 points)

Complete the following utility functions:

```javascript
// 1. Merge multiple arrays and remove duplicates
function mergeUnique(...arrays) {
    // Your code
}

// 2. Update user profile immutably (do not mutate original)
function updateProfile(user, updates) {
    // Your code
}

// 3. Extract unknown properties into 'rest'
function processConfig({ host, port, ...rest }) {
    // Return object with host, port, and otherOptions containing rest
}

// Tests
console.log(mergeUnique([1, 2], [2, 3], [3, 4])); // [1, 2, 3, 4]
console.log(updateProfile({ name: 'Zayaan', age: 1 }, { age: 2, city: 'Dhaka' }));
// { name: 'Zayaan', age: 2, city: 'Dhaka' }
console.log(processConfig({ host: 'localhost', port: 3000, ssl: true, timeout: 5000 }));
// { host: 'localhost', port: 3000, otherOptions: { ssl: true, timeout: 5000 } }
```

**Your Code:**

```javascript

```

---

## Section F: OOP & Prototypes (15 Points)

### F1. Class Implementation (8 points)

Create a `SmartBankAccount` class with:
- Constructor with `owner`, `initialBalance`, `accountType` (savings/checking)
- Methods: `deposit(amount)`, `withdraw(amount)`, `getBalance()`, `getHistory()`
- Transaction history with timestamps
- Static method `transfer(fromAccount, toAccount, amount)`
- Inheritance: `SavingsAccount` extends base with `addInterest(rate)`

**Your Code:**

```javascript

```

---

### F2. Prototype vs Class (4 points)

Rewrite the `SmartBankAccount` using constructor function + prototype (pre-ES6 style):

**Your Code:**

```javascript

```

---

### F3. instanceof & Prototype Chain (3 points)

Explain what these will output and why:

```javascript
class Animal {}
class Dog extends Animal {}
const dog = new Dog();

console.log(dog instanceof Dog);
console.log(dog instanceof Animal);
console.log(dog instanceof Object);
console.log(Dog.prototype.__proto__ === Animal.prototype);
```

**Your Answer:**

---

## Section G: Asynchronous JavaScript (15 Points)

### G1. Promise Fundamentals (5 points)

What is the output order? Explain the event loop behavior:

```javascript
console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

Promise.resolve().then(() => {
    console.log('D');
    return Promise.resolve('E');
}).then(msg => console.log(msg));

console.log('F');
```

**Your Answer:**

---

### G2. Async/Await Error Handling (5 points)

Complete the function with proper error handling:

```javascript
async function fetchUserWithPosts(userId) {
    // Fetch user from: https://jsonplaceholder.typicode.com/users/${userId}
    // Then fetch their posts from: https://jsonplaceholder.typicode.com/posts?userId=${userId}
    // Return { user, posts } or throw appropriate errors
    // Handle: network errors, 404 user not found, JSON parsing errors
}

// Usage
fetchUserWithPosts(1)
    .then(data => console.log(data))
    .catch(err => console.error('Failed:', err.message));
```

**Your Code:**

```javascript

```

---

### G3. Promise.all vs Promise.allSettled (5 points)

Write a function that fetches multiple URLs and:
- Returns successful results
- Logs failed URLs without stopping others
- Uses modern Promise methods

```javascript
const urls = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/users/2',
    'https://invalid-url-expected-to-fail.com/data'
];

async function fetchMultiple(urls) {
    // Your implementation
}

fetchMultiple(urls).then(results => console.log(results));
// Should show: { successful: [...], failed: [...] }
```

**Your Code:**

```javascript

```

---

## Section H: Real-World Challenge (10 Points)

### H1. Build a Mini Task Queue System

Create a task queue system similar to Laravel's job queue but in JavaScript:

Requirements:
1. `TaskQueue` class to manage async tasks
2. `add(task)` - add a task (function returning Promise)
3. `run()` - execute all tasks sequentially
4. `runParallel(limit)` - execute with concurrency limit
5. `onProgress(callback)` - report completed/total
6. Proper error handling (do not stop on single failure)

**Your Code:**

```javascript

// Test
const queue = new TaskQueue();

queue.add(() => fetch('https://api.example.com/data1'));
queue.add(() => fetch('https://api.example.com/data2'));
queue.add(() => new Promise(resolve => setTimeout(resolve, 1000)));

queue.onProgress((completed, total) => {
    console.log(`Progress: ${completed}/${total}`);
});

await queue.run();
// OR
await queue.runParallel(2); // max 2 concurrent
```

---

## Section I: Code Review & Debugging (5 Points)

### I1. Find the Bugs (5 points)

This code has 5 bugs. Identify and fix them:

```javascript
class UserManager {
    constructor() {
        this.users = [];
        this.nextId = 1;
    }
    
    addUser(name, email) {
        const user = {
            id: nextId++,
            name: name,
            email: email,
            createdAt: new Date()
        };
        this.users.push(user);
        return this;
    }
    
    getUser(id) {
        return this.users.find(u => u.id = id);
    }
    
    deleteUser(id) {
        const index = this.users.findIndex(u => u.id === id);
        if (index) {
            this.users.splice(index, 1);
        }
    }
    
    async fetchRemoteUsers() {
        const response = fetch('/api/users');
        const users = response.json();
        this.users = [...this.users, ...users];
        return users.length;
    }
}

const manager = UserManager();
manager.addUser('Zayaan', 'z@example.com');
console.log(manager.getUser(1).name);
```

**Bugs Found:**

1. 
2. 
3. 
4. 
5. 

---

## Section J: PHP vs JavaScript Comparison (5 Points)

### J1. Translate PHP to JavaScript (5 points)

Given your Laravel/PHP background, translate this PHP code to JavaScript (use modern ES6+ features):

```php
<?php
class OrderService {
    private array $orders = [];
    private int $nextId = 1;
    
    public function addOrder(array $data): Order {
        $total = array_reduce(
            $data['items'], 
            fn($sum, $item) => $sum + $item['price'] * $item['qty'], 
            0
        );
        
        $order = new Order(
            id: $this->nextId++,
            customer: $data['customer'],
            items: $data['items'],
            total: $total
        );
        
        $this->orders[] = $order;
        return $order;
    }
    
    public function getByCustomer(string $customer): array {
        return array_filter(
            $this->orders, 
            fn($o) => $o->customer === $customer
        );
    }
    
    public function getTotalRevenue(): float {
        return array_reduce(
            $this->orders,
            fn($sum, $o) => $sum + $o->total,
            0.0
        );
    }
}

class Order {
    public function __construct(
        public int $id,
        public string $customer,
        public array $items,
        public float $total
    ) {}
}
```

**Your JavaScript Code:**

```javascript

```

---

## Answer Key & Self-Assessment

After completing the exam, compare your answers with these expected concepts:

### Section A - Expected Understanding:
- A1: `undefined` (var hoisted), ReferenceError (let not hoisted)
- A2: Part 1: 20, 10; Part 2: Both show [1,2,3,4] (reference); Part 3: "Zayaan", "Lammim" (shallow copy)
- A3: true, false, true, false, true, false
- A4: Symbols are always unique, used for private object properties

### Section B - Expected Implementation:
- B2: Closure maintaining state across calls
- B3: Higher-order function returning validation function

### Section C - Expected Knowledge:
- C1: First prints "Zayaan", second undefined. Fix: Use arrow function or bind
- C2: call = comma args, apply = array args, bind = returns new function
- C3: Arrow functions do not have their own `this`

### Section D - Expected Solutions:
- D1: Chaining filter/map/reduce for data transformation
- D2: Using frequency map or Set for duplicate detection

### Section E - Expected Patterns:
- E1: Deep destructuring with aliases
- E2: Rest/spread for flexible parameter handling

### Section F - Expected OOP:
- F1: Class with private state via closure or #private fields
- F2: Constructor function + prototype methods
- F3: Prototype chain traversal with instanceof

### Section G - Expected Async:
- G1: A, F, C, D, E, B (microtasks before macrotasks)
- G2: Proper try/catch with fetch error handling
- G3: Promise.allSettled for partial failure handling

### Section H - Expected Architecture:
- Sequential execution with array iteration
- Concurrency limiting with Promise pool pattern

### Section I - Expected Bug Fixes:
1. Missing `new` keyword: `const manager = new UserManager()`
2. Missing `this.nextId` instead of `nextId`
3. Assignment instead of comparison: `u.id === id`
4. Index check should be `index !== -1` (0 is falsy)
5. Missing `await` on fetch and response.json()

### Section J - Expected Translation:
- Class syntax with constructor
- Arrow functions for callbacks
- Array methods: reduce, filter
- Public class fields

---

## Scoring Guide

| Score | Assessment |
|-------|------------|
| 90-100 | **Expert** - Ready for advanced JS backend work (Node.js) |
| 75-89  | **Proficient** - Solid foundation, minor gaps in advanced concepts |
| 60-74  | **Intermediate** - Review closures, async, and OOP sections |
| Below 60 | **Needs Review** - Revisit Week-01 and Week-02 fundamentals |

---

## Next Steps After Completion

1. **Self-grade** using the answer key above
2. **Identify weak sections** - Focus your review there
3. **Practice coding** - Write working solutions for questions you missed
4. **Compare with your original files** - Review your Week-01/Week-02 solutions

Good luck! This exam covers all core concepts a backend engineer needs when transitioning from PHP/Laravel to JavaScript/Node.js.
