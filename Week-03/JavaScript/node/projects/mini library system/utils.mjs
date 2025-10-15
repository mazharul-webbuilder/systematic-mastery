export function getNextBookId(){
    let id = 0
    return () => ++id
}