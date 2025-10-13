import {formatedTime} from "../filer logger - pro1/utils.mjs";

export default class Logger {
    constructor() {
        this.logs = []
    }

    log(label, studentId, message, tripId = null){
        const  log = {
            label,
            studentId,
            tripId,
            time: formatedTime(),
            message
        }
        this.logs.push(log)
        console.log(`[${label}] ${message}`)
    }

    getLogs(){
        return this.logs
    }
}