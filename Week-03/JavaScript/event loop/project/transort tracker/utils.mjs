// utils.mjs
export function delay(ms) { return new Promise(res => setTimeout(res, ms)); }
export function nextUniqueId() {
    let id = 0;
    return () => ++id;
}
export const getNextTransactionId = nextUniqueId();
export function bookingLogger(logs, log) { logs.push(log); }