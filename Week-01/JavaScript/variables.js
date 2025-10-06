// Variable Declaration
const name = "Mazlam Islam Zayaan"
const father = "Mazharul Islam"
const mother = "Lammim Islam"
let ageInMonth = 13
var message = "Happy Birthday Zayaan!"

const allowedFoods = ['apple', 'banana', 'ots', 'rice', 'sweet potato']

const baby = {
    name: "Mazhalm Islam",
    nickName: "Zayaan",
    fullname: `${this.name} ${this.nickName}`,
    fatherName: father,
    motherName: mother,
    ageInMonth: ageInMonth,
    category: null
}


// ⚠️ const means the binding can’t change, but objects/arrays inside can mutate:
if(ageInMonth > 12) {
    allowedFoods.push('salt')
    baby.message = "Infant"
}






