// Variable Declaration
const name = "Mazlam Islam Zayaan"
const father = "Mazharul Islam"
const mother = "Lammim Islam"
let ageInMonth = 12
var message = "Happy Birthday Zayaan!"

const allowedFoods = ['apple', 'banana', 'ots', 'rice', 'sweet potato']

const baby = {
    name: "Mazlam Islam",
    nickName: "Zayaan",
    fullName: `${this.name} ${this.nickName}`,
    fatherName: father,
    motherName: mother,
    ageInMonth: ageInMonth,
    category: null,
    info: function (){
        return `
            Name : ${this.name}.
            Age: ${this.ageInMonth}
        `
    }
}

console.log(baby.info())

// ⚠️ const means the binding can’t change, but objects/arrays inside can mutate:
if(ageInMonth > 12) {
    allowedFoods.push('salt')
    baby.message = "Infant"
}






