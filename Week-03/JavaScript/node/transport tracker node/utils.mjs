export function nextUniqueId() {
    let id = 0
    return () => ++id
}

export function delay(ms) {
    return new Promise(res => setTimeout(res, ms))
}

export function bookingLogger(logs, log) {
    return logs.push(log)
}