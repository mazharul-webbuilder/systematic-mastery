// Private transaction ID counter
function createTransactionId() {
    let id = 0;
    return () => ++id;
}
const getNextTransactionId = createTransactionId();

class SmartBank {
    constructor(owner, initialBalance = 0) {
        this.owner = owner;
        this.balance = initialBalance;
        this.transactionHistory = [];
    }

    async deposit(amount) {
        // simulate async deposit
        await new Promise(res => setTimeout(res, 1000));
        this.balance += amount;
        this.transactionHistory.push({
            id: getNextTransactionId(),
            type: "deposit",
            amount,
            time: new Date().toISOString(),
            status: "success"
        });
        return this.balance;
    }

    async withdraw(amount) {
        await new Promise(res => setTimeout(res, 1500));
        if (amount > this.balance) {
            this.transactionHistory.push({
                id: getNextTransactionId(),
                type: "withdraw",
                amount,
                time: new Date().toISOString(),
                status: "failed"
            });
            return "❌ Insufficient balance";
        }
        this.balance -= amount;
        this.transactionHistory.push({
            id: getNextTransactionId(),
            type: "withdraw",
            amount,
            time: new Date().toISOString(),
            status: "success"
        });
        return this.balance;
    }

    getBalance() {
        return this.balance;
    }

    getHistory() {
        return this.transactionHistory;
    }

    async transfer(toAccount, amount) {
       const  withDrawResponse = await this.withdraw(amount)
        if (typeof withDrawResponse !== 'number'){
            return withDrawResponse
        }
        // Deposit the money
        await toAccount.deposit(amount)
    }

    async addInterest(rate){
        const interestAmount = (rate * this.balance) / 100

        this.balance+= interestAmount

        this.transactionHistory.push({
            id: getNextTransactionId(),
            type: "interest",
            amount: interestAmount,
            time: new Date().toISOString(),
            status: "success"
        })

        return this.balance
    }

}

// Example usage
const acc1 = new SmartBank("Zayaan", 100);
const acc2 = new SmartBank("Lammim", 50);

await acc1.transfer(acc2, 10)
await acc1.addInterest(5)


console.log(acc1.getBalance(), acc2.getBalance(), acc1.transactionHistory, acc2.transactionHistory)
