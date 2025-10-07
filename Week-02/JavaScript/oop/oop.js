class SmartBank {
    constructor(initialBalance = 0) {
        this.initialBalance = initialBalance
        this.balance = initialBalance
        this.transactionHistory = []
    }

    deposit(amount) {
        this.balance += amount
        const history = {
            type: 'deposit',
            amount,
            time: new Date().toISOString()
        }
        this.addTransactionHistory(history)
        return this.balance
    }

    withdraw(amount) {
        const history = {
            amount,
            time: new Date().toISOString()
        }
        if (amount > this.balance) {
            history.type = 'failed-withdraw'
            history.reason = 'Not enough fund'
            this.addTransactionHistory(history)
            return "Insufficient balance"
        } else {
            this.balance -= amount
            history.type = 'withdraw'
            this.addTransactionHistory(history)
            return this.balance
        }
    }

    getBalance() {
        return this.balance
    }

    getHistory() {
        return this.transactionHistory
    }

    reset() {
        this.balance = this.initialBalance
        this.transactionHistory.length = 0
    }

    addTransactionHistory(transaction) {
        this.transactionHistory.push(transaction)
    }
}

// Test
const acc1 = new SmartBank(100)
acc1.deposit(50)
acc1.withdraw(30)
acc1.withdraw(200)
console.log(acc1.getBalance()) // 120
console.log(acc1.getHistory())
acc1.reset()
console.log(acc1.getHistory()) // []
