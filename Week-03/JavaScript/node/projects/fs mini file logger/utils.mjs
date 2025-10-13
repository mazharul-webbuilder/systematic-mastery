import fs from 'fs/promises'

export async function logMessage(){
    const fileName = 'logs.txt'
    const logEntry = 'Trip Started.' + new Date().toDateString() + '\n'
    await fs.appendFile(fileName, logEntry , 'utf8')
}

