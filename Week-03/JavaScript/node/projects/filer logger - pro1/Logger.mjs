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
        if (this.isWriting) return;
        this.isWriting = true;

        while (this.queue.length > 0) {
            const timeStamp = formatedTime();
            const { label, msg } = this.queue.shift();
            const formattedMsg = `${timeStamp} | ${label} : ${msg}\n`;

            try {
                let fileSize = 0;
                try {
                    const fileStat = await fs.stat(this.fileName);
                    fileSize = fileStat.size;
                } catch {
                    // File doesn't exist yet — fine, we’ll create it
                }

                // Rotate file if size > 300 bytes
                if (fileSize > 300) {
                    const timeSuffix = new Date().toISOString().replace(/[:.]/g, '-');
                    this.fileName = this.fileName.replace('.log', '') + `_${timeSuffix}.log`;
                    console.log(`🌀 Log rotated → ${this.fileName}`);
                }

                await fs.appendFile(this.fileName, formattedMsg);
                this.logs.push({ label, timeStamp, msg });

            } catch (err) {
                console.error("❌ Failed to write log:", err);
            }
        }

        this.isWriting = false;
    }


    getLogs() {
        return this.logs;
    }
}
