import fs from 'fs/promises'
import { formatedTime } from "./utils.mjs";

export default class Logger {
    constructor(fileName) {
        this.fileName = fileName;
        this.logs = [];
        this.queue = [];       // Queue for pending logs
        this.isWriting = false; // Lock to prevent race
    }

    async info(msg) {
        this.queue.push({ label: 'INFO', msg });
        await this.processQueue();
    }

    async warn(msg) {
        this.queue.push({ label: 'WARN', msg });
        await this.processQueue();
    }

    async error(msg) {
        this.queue.push({ label: 'ERROR', msg });
        await this.processQueue();
    }

    async processQueue() {
        if (this.isWriting) return; // Already writing, skip

        this.isWriting = true;

        while (this.queue.length > 0) {
            const { label, msg } = this.queue.shift();
            const timeStamp = formatedTime();

            const formattedLog = `${timeStamp} | ${label} : ${msg}\n`;

            try {
                await fs.appendFile(this.fileName, formattedLog);
                this.logs.push({ label, timeStamp, msg });
            } catch (err) {
                console.error("Failed to write log:", err);
            }
        }

        this.isWriting = false;
    }

    getLogs() {
        return this.logs;
    }
}
