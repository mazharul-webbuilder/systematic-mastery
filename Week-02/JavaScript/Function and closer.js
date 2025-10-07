// Task 1 — Advanced Function + Closure
function createCounter(count = 1) {
    let initialValue = count
    return {
        increment: (value = 1) => count += value,
        multiply: function (...numbers) {
            count = numbers.reduce(function (accumulator, number) {
                return number * accumulator

            }, count)
        },
        getCount: () => count,
        reset: () => count = initialValue
    }
}

// Create a Simple Bank Account System (using Closure)
function createAccount(initialBalance = 100) {
    let balance = initialBalance;
    return {
        getBalance: () => balance,
        deposit: (amount) => balance += amount,
        withdraw: (amount) => {
            if (amount > balance) {
                return "Insufficient balance"
            } else {
                balance -= amount
            }
        },
        reset: () => balance = initialBalance,
    }
}

// Level 2 Closure Challenge — “Smart Bank v2”
function createSmartAccount(initialBalance = 0) {
    let balance = initialBalance
    const transactionHistory = []

    return {
        getBalance: () => balance,
        deposit: (amount) => {
            balance += amount
            addTransactionHistory({
                type: 'deposit',
                amount,
            }, transactionHistory)
            return balance
        },
        withdraw: (amount) => {
            const history = {
                amount,
            }

            if (amount > balance) {
                history.type = "failed-withdraw"
                history.reason = 'Insufficient funds'
                addTransactionHistory(history, transactionHistory)
                return "❌ Insufficient balance";
            } else {
                history.type = "withdraw"
                balance -= amount
                addTransactionHistory(history, transactionHistory)
                return balance
            }
        },
        getHistory: () => transactionHistory,
        reset: () => {
            balance = initialBalance
            transactionHistory.length = 0
        }
    }
}

function addTransactionHistory(transaction, historyArr) {
    const formatedTransaction = {
        type: transaction.type,
        amount: transaction.amount,
    };

    if (transaction.type === 'failed-withdraw') {
        formatedTransaction.reason = transaction.reason
    } else {
        formatedTransaction.time = new Date().toISOString()
    }

    return historyArr.push(formatedTransaction)
}

const account = createSmartAccount(100);
account.deposit(50);
account.withdraw(30);
account.withdraw(200); // fail
console.log(account.getBalance()); // 120
console.log(account.getHistory());
account.reset();
console.log(account.getHistory()); // []


