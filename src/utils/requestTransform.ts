export function objTOParams(obj) {
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    let str = ""
    for (const key in keys) {

        if(values[key] === '' || values[key] === undefined){
            continue
        }
        if (Number(key) + 1 !== keys.length) {
            str += `${keys[key]}=${values[key]}&`
        } else {
            str += `${keys[key]}=${values[key]}`
        }
    }
    return str
}
