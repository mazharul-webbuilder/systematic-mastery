# fs = File System Module
#### It allows to read, write, update, delete, and watch files and directories on your machine.

- Node gives us two flavors of every method:
### 1 Sync
- Blocks Code until done
```js
fs.readFileSync('zayaan.txt')
```

### 2 Async (non-blocking)
- Uses callbacks or Promises
```js
fs.readFile('zayaan.txt', cb)
// or
await fs.promise.readFile()
```