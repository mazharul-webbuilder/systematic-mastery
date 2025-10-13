import {logMessage} from "./utils.mjs";

export default class SmartTracker {
    constructor() {
        this.tripLogs = []
    }

    async startTrip(tripId){
        this.tripLogs.push({
            tripId,
            time: new Date().toDateString()
        })
        await logMessage()

        return new Promise(res => setTimeout(() => {
            console.log('Trip Started Successfully')
            res()
        }, 1500))
    }
}