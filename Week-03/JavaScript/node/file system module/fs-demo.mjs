import fs from 'fs/promises'

// 1 Write to a file
await fs.writeFile('note.txt', 'Hello Zayaan');

// 2 Read the file content
const fileContent = await fs.readFile('note.txt', 'utf-8')

// 3 Append more content
await fs.appendFile('note.txt', '\nLearning to walk is fun')

// 4 Delete the file
await fs.unlink('note.txt')

