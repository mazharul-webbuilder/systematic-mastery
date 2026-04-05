// Shallow copy and deep copy
const arr = [1, 2] // [1, 2]
const referenceCopy = arr // [1, 2], if value change in origin array value will be changed in the reference Copy vise versa
const shallowCopy = [...arr] // [1, 2]
shallowCopy.push(3) // [1,2,3] Note original arr and referenceCopy will not add 3, but if there was reference function or object in origin array show copy can be modified value not the primite one

// Shallow copy example with object for more clear concept
const originalObj = {
    name: "Zayaan",
    loveToDo: {
        droppingThings: true,
    }
}

const referenceCopyObj = originalObj
referenceCopyObj.loveToDo.droppingThings = false // value will be changed in both place

// Lets do shallow copy
const shallowCopyObj = {...originalObj}
shallowCopyObj.name = "Mazlam" // Here shallow copy obj name will be changed but not the original object name
shallowCopyObj.loveToDo.droppingThings = true // Here is the game when this change to true inside origin copy of the object will be true, this is drawback of shallow copy


// Here is deep copy
const deepCopyObj = structuredClone(originalObj)
deepCopyObj.name = "Mazlam Islam"
deepCopyObj.loveToDo.droppingThings = false // In deep copy origin object references object value will not change

// Shallow copy is faster
// Deep copy is slower as it copy complete object



