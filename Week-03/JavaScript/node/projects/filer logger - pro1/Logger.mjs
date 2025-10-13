import fs from 'fs/promises'
import {formatedTime} from "./utils.mjs";

export default class Logger {
    constructor(fileName) {
        this.fileName = fileName
        this.logs = []
    }

    async info(msg) {
        await this.addLog('INFO', msg)

    }

    async warn(msg) {
        await this.addLog('WARN', msg)
    }

    async error(msg) {
        await this.addLog('ERROR', msg)
    }

    async addLog(label, msg) {
        const timeStamp = formatedTime()
        const log = {
            label,
            timeStamp,
            msg
        }
        const formatedLog = `${timeStamp} | ${label} : ${msg} \n`

        await fs.appendFile(this.fileName, formatedLog)
        this.logs.push(log)
    }

    getLogs(){
        return this.logs
    }
}