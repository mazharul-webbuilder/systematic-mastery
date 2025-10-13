export function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

export function formattedTime() {
    return new Date().toLocaleString("en-US", { timeZone: 'Asia/Dhaka' });
}

export function nextUniqueId() {
    let id = 0;
    return () => ++id;
}
