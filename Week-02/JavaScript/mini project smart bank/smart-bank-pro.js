function getTransactionId() {
    let id = 0
    return () => ++id
}

const getNextTransactionId = getTransactionId()

class BankAccount {
    constructor(owner, balance) {
        this.owner = owner
        this.balance = balance
        this.transactionHistory = []
        this.initialbalance = balance
    }

    async deposit(amount) {
        new Promise((res) => res(setTimeout(res, 1000)))
        this.balance += amount
        this.addNewTransaction('deposit', amount, 'success')
    }

    async withdraw(amount){
        if (amount > this.balance){
            const msg = 'Insufficient balance';
            this.addNewTransaction('withdraw', amount, 'failed', msg)
            return msg
        }
        new Promise((res) => setTimeout(res, 1500))
        this.balance -= amount
        this.addNewTransaction('withdraw', amount, 'success')

    }

    addNewTransaction(type, amount, status,  reason = null) {
        const formatedTransaction = {
            id: getNextTransactionId(),
            type,
            amount,
            ...(reason && {reason}), // Only attach if has reason
            time: new Date().toISOString(),
            status
        }
        this.transactionHistory.push(formatedTransaction)
    }

    getBalance() {
        return this.balance
    }

    getHistory() {
        return this.transactionHistory
    }

    reset(){
        return this.balance = this.initialbalance
    }
    async transfer(toAccount, amount){
        if (amount > this.balance){
            this.addNewTransaction('transfer', amount, 'failed', 'Insufficient balance')
        }
        toAccount.balance += amount
        this.addNewTransaction('transfer', amount, 'success' )
        toAccount.deposit(amount)
    }
    addInterest(rate){
        const amount = (rate * this.balance) / 100
        this.balance += amount
        this.addNewTransaction('interest', amount, 'success')
    }
}

const acc1 = new BankAccount('Zayaan', 100)
await acc1.deposit(100)

