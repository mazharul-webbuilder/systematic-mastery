import fs from 'fs/promises'
import {formatedTime} from "./utils.mjs";

export default class Logger {
    constructor(fileName) {
        this.fileName = fileName;
        this.logs = [];
        this.queue = [];       // Queue for pending logs
        this.isWriting = false; // Lock to prevent race
    }

    async info(msg) {
        this.queue.push({label: 'INFO', msg});
        await this.processQueue();
    }

    async warn(msg) {
        this.queue.push({label: 'WARN', msg});
        await this.processQueue();
    }

    async error(msg) {
        this.queue.push({label: 'ERROR', msg});
        await this.processQueue();
    }

    async processQueue() {
        if (this.isWriting) return
        this.isWriting = true

        while (this.queue.length > 0) {
            const timeStamp = formatedTime()
            const {label, msg} = this.queue.shift()

            const formatedMsg = `${timeStamp} | ${label} : ${msg} \n`
            try {
                const fileStat = await fs.stat(this.fileName)

                if (fileStat.size > 300) {
                    this.fileName = this.fileName.replace('.log', '') + '_' + new Date().toDateString() + '.txt'
                }
                await fs.appendFile(this.fileName, formatedMsg)
                this.logs.push({
                    label,
                    timeStamp,
                    msg
                })
            } catch (e) {
                console.log(e)
                console.log('Failed to write log')
            }
        }
        this.isWriting = false
    }

    getLogs() {
        return this.logs;
    }
}
