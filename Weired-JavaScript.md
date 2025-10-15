# 🤯 Weird JavaScript Scenarios

A curated list of JavaScript’s most confusing, funny, and mind-bending behaviours — with short explanations.

---

## 🧮 Type Coercion

| Code | Output | Why |
|------|---------|-----|
| `[] + []` | `""` | Arrays convert to strings (`[].toString()` → `""`). |
| `[] + {}` | `"[object Object]"` | Array → `""`, Object → string. |
| `{}` + [] | `0` | `{}` treated as block, so `+[]` → `0`. |
| `"5" - 3` | `2` | `-` forces numeric conversion. |
| `"5" + 3` | `"53"` | `+` concatenates strings. |
| `true + false` | `1` | Boolean → number (`1 + 0`). |
| `[] == ![]` | `true` | `![] → false`, `[] → "" → 0`. |
| `[] == 0` | `true` | `[] → "" → 0`. |
| `![] == 0` | `true` | `![] → false → 0`. |
| `"b" + "a" + +"a" + "a"` | `"baNaNa"` | `+"a"` → `NaN`. |
| `typeof NaN` | `"number"` | `NaN` is a numeric type. |
| `typeof null` | `"object"` | Old JS bug. |
| `NaN === NaN` | `false` | NaN is never equal to itself. |
| `0.1 + 0.2 === 0.3` | `false` | Floating-point precision issue. |
| `1 < 2 < 3` | `true` | `true < 3` → `1 < 3`. |
| `3 > 2 > 1` | `false` | `true > 1` → `1 > 1`. |
| `null == 0` | `false` | `null` only equals `undefined`. |
| `undefined == null` | `true` | Both loosely equal. |

---

## ⚙️ Functions and Scope

| Code | Output | Why |
|------|---------|-----|
| ```js
foo(); function foo(){console.log('bar')}
``` | `"bar"` | Functions are hoisted. |
| ```js
console.log(a); var a = 5;
``` | `undefined` | `var` is hoisted without value. |
| ```js
console.log(x); let x = 10;
``` | `ReferenceError` | Temporal Dead Zone for `let`. |
| ```js
function f(){bar='hi'}; f(); console.log(bar)
``` | `"hi"` | Implicit global (non-strict mode). |
| ```js
(function(){console.log('run!')})();
``` | `"run!"` | IIFE executes immediately. |

---

## 🧩 Comparisons and Equality

| Code | Output | Why |
|------|---------|-----|
| `false == "0"` | `true` | Both coerced to number 0. |
| `false == []` | `true` | `[] → "" → 0`. |
| `"" == 0` | `true` | `"" → 0`. |
| `'' == '0'` | `false` | Both are strings, no coercion. |

---

## 🧠 Syntax Surprises

| Code | Output | Why |
|------|---------|-----|
| `{} + [] + {} + [1]` | `"[object Object][object Object]1"` | String coercion chain. |
| `({a:b}={a:10}); console.log(b)` | `10` | Parentheses make it expression. |
| ```js
return
{ key: 'v' }
``` | `undefined` | Automatic semicolon after `return`. |
| `typeof function(){}` | `"function"` | Unique subtype of object. |

---

## 🔁 Logical Operators

| Code | Output | Why |
|------|---------|-----|
| `true && "Hi"` | `"Hi"` | `&&` returns last truthy. |
| `false || "Hi"` | `"Hi"` | `||` returns first truthy. |
| `0 && "Hi"` | `0` | Returns first falsy value. |

---

## 💥 Miscellaneous

| Code | Output | Why |
|------|---------|-----|
| `1 / 0` | `Infinity` | Division by zero. |
| `-1 / 0` | `-Infinity` | Negative division. |
| `Infinity / Infinity` | `NaN` | Indeterminate. |
| `delete x` (where x is var) | `false` | Only works on object props. |
| `typeof []` | `"object"` | Arrays are objects. |
| `Array.isArray([])` | `true` | Correct array check. |
| `isNaN("hello")` | `true` | `"hello"` → NaN. |
| `Number.isNaN("hello")` | `false` | No coercion. |
| `let arr=[1,2,3]; arr.length=0;` | `[]` | Clearing array by length. |
| `9999999999999999` | `10000000000000000` | Exceeds JS precision (2⁵³). |
| `parseInt("08")` | `8` | Defaults to base 10. |
| `parseInt("08",8)` | `0` | Octal parsing. |
| `++[[]][+[]]+[+[]]` | `"10"` | Deep coercion chain. |

---

## 🧾 Summary

JavaScript type coercion and loose equality rules can lead to extremely confusing results.  
Always prefer:
- `===` and `!==` (strict equality)  
- `Number()`, `String()`, `Boolean()` explicitly  
- `"use strict"` mode  

---

**Created for learning and fun 😄**
