// app.mjs
import { BankAccount } from './bank.mjs'

const acc1 = new BankAccount('Zayaan', 100)
const acc2 = new BankAccount('Lammim', 50)

acc1.deposit(50)
acc1.withdraw(30)
console.log('Balance acc1:', acc1.getBalance())

acc2.withdraw(60) // should fail
console.log('Balance acc2:', acc2.getBalance())
