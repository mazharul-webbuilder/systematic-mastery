// bank.mjs

export class BankAccount {
    constructor(owner, balance = 0) {
        this.owner = owner
        this.balance = balance
    }

    deposit(amount) {
        this.balance += amount
        console.log(`${this.owner} deposited ${amount}. New balance: ${this.balance}`)
    }

    withdraw(amount) {
        if (amount > this.balance) {
            console.log(`${this.owner} cannot withdraw ${amount}. Insufficient balance.`)
            return
        }
        this.balance -= amount
        console.log(`${this.owner} withdrew ${amount}. New balance: ${this.balance}`)
    }

    getBalance() {
        return this.balance
    }
}
