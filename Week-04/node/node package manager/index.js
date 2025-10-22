
// First check the underscore as Core module
// If not found than check the underscore as File or folder
// If not found than check the underscore as node_modules
const _ = require('underscore')

const result = _.contains([1, 3], 3)

console.log(result)