# Node.js Modules and Global Object

A comprehensive guide to understanding how Node.js modules and the global object work internally.

## Table of Contents
- [Global Object](#global-object)
- [Modules in Node.js](#modules-in-nodejs)
- [How Modules Work Internally](#how-modules-work-internally)
- [Module Wrapper Function](#module-wrapper-function)
- [Module Caching](#module-caching)
- [Best Practices](#best-practices)

## Global Object

### What is the Global Object?

The global object is the top-level scope container that differs between environments:

- **Browser**: `window` object
- **Node.js**: `global` object

### Globally Available Functions

These functions are available in the global scope without requiring any imports:
```javascript
console.log()      // Logging to console
setTimeout()       // Execute code after delay
clearTimeout()     // Cancel setTimeout
setInterval()      // Execute code repeatedly
clearInterval()    // Cancel setInterval
```

### Adding to Global Scope

You can add properties to the global object, making them accessible across all files:
```javascript
global.sayHello = function() {
  console.log('Hello from global scope');
}

// Accessible in any file without requiring
global.sayHello();
```

⚠️ **Warning**: Polluting the global scope is generally discouraged as it can lead to naming conflicts and make code harder to maintain.

## Modules in Node.js

### What are Modules?

Modules are encapsulated pieces of code that help organize and structure your application. Each file in Node.js is treated as a separate module with its own scope.

### Built-in Modules

Node.js provides several core modules:
```javascript
const fs = require('fs');        // File system operations
const http = require('http');    // HTTP server and client
const path = require('path');    // File path utilities
const os = require('os');        // Operating system utilities
const events = require('events'); // Event emitter
```

### Exporting from Modules

There are multiple ways to export functionality:

#### Method 1: Individual Exports
```javascript
module.exports.log = function(message) {
  console.log(message);
}

module.exports.endPoint = 'https://api.example.com';
```

#### Method 2: Single Export
```javascript
module.exports = function(message) {
  console.log(message);
}
```

#### Method 3: Exports Shorthand
```javascript
exports.log = function(message) {
  console.log(message);
}
```

⚠️ **Note**: Don't reassign `exports` directly (e.g., `exports = {}`). Use `module.exports` for complete replacement.

### Importing Modules
```javascript
const myModule = require('./myModule');
myModule.log('Hello');
console.log(myModule.endPoint);
```

## How Modules Work Internally

### Module Wrapper Function

When Node.js loads a module, it doesn't execute the code directly. Instead, it wraps your code in an IIFE (Immediately Invoked Function Expression):
```javascript
(function(exports, require, module, __filename, __dirname) {
  // Your module code goes here
  
  var sayHello = function() {
    console.log('Hello');
  }
  
  module.exports.log = log;
  module.exports.endPoint = url;
  
  // Your code ends here
});
```

### The Five Parameters

1. **exports**: A shorthand reference to `module.exports`
2. **require**: Function to import other modules
3. **module**: Reference to the current module object
4. **__filename**: Absolute path to the current file
5. **__dirname**: Absolute path to the directory containing the file

### Why Wrapping Matters

This wrapper function provides several benefits:

- **Scope Isolation**: Variables declared in a module are scoped to that module, not global
- **Automatic Parameters**: Provides `require`, `module`, `exports` without explicit imports
- **Encapsulation**: Prevents variable collisions between modules

### Module Object Structure

When you log the `module` object, you'll see:
```code
Module {
  id: '.',
  path: '/path/to/directory',
  exports: { log: [Function], endPoint: 'url' },
  parent: null,
  filename: '/path/to/file.js',
  loaded: false,
  children: [],
  paths: [ /* module search paths */ ]
}
```

**Key Properties:**
- `exports`: What the module exposes to other files
- `filename`: Full path to the module file
- `loaded`: Whether the module has finished loading
- `children`: Modules required by this module

## Module Caching

Node.js caches modules after the first load:
```js
// First require - module code executes
const mod1 = require('./myModule');

// Second require - returns cached version
const mod2 = require('./myModule');

console.log(mod1 === mod2); // true
```

### Cache Location

Cached modules are stored in `require.cache`:
```javascript
// View all cached modules
console.log(require.cache);

// Clear cache for a specific module (rarely needed)
delete require.cache[require.resolve('./myModule')];
```

## Best Practices

### ✅ Do's

1. **Use modules** to organize code into logical units
2. **Export only what's necessary** to maintain encapsulation
3. **Use descriptive names** for exported functions and properties
4. **Follow single responsibility** principle for modules
5. **Use const** when requiring modules to prevent reassignment

### ❌ Don'ts

1. **Avoid polluting global scope** unless absolutely necessary
2. **Don't use circular dependencies** (Module A requires Module B, which requires Module A)
3. **Don't reassign exports** directly (use `module.exports` instead)
4. **Avoid modifying require.cache** unless you have a specific reason

## Summary

- **Global object** provides environment-wide scope (use sparingly)
- **Modules** encapsulate code and prevent global namespace pollution
- **Module wrapper** provides automatic parameters and scope isolation
- **Each file is a module** with its own private scope
- **`module.exports`** defines what a module exposes
- **`require()`** imports and caches modules
- **Modules are cached** after first load for performance

---
