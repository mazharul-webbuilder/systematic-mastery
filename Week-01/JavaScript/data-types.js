// Primitive (immutable) string, number, boolean, null, undefined, symbol, bigint
// Reference (mutable) object, array, function

let name = 'Zayaan'
let ageInMonth = 11
let isHappy = false
let birthDayMessage = null
let gotoSchool;
let sym1 = Symbol('love father')
let sym2 = Symbol('love father')
let largeNumber = 123456789012345678901234567890n;

if(sym1 === sym2){
    console.log('Love Father')
}else{
    console.log('Love Mother')
}


if(isHappy){
    gotoSchool = true
}else{
    gotoSchool = "NO"
}

let person = {
    ageInMonth: ageInMonth,
    birthDayMessage: birthDayMessage
}

let sampleDataAboutZayaan = [name, ageInMonth, isHappy, birthDayMessage];

const birthdayMessage = (name) => {
  return `Happy Birthday to my daddy ${name}`;
};

// To use it:
console.log(birthdayMessage(name)); // Output: Happy Birthday to my daddy Michael


