export function clearObject(obj) {
    Object.keys(obj).forEach((key) => {
        obj[key] = ''
    })
}


// This function name is slightly misleading as the function both work on array to objects and
// object to object, i may come one of these days to rename this again.

export function transferArrayToObject(obj, array, custom_transfer) {

    Object.keys(obj).forEach((k) => {

        if(custom_transfer){
            Object.keys(custom_transfer).forEach((k1) => {

                if(k === k1){
                    obj[k] = array[custom_transfer[k]]
                }else{
                    obj[k] = array[k]
                }
            })
        }else{
            obj[k] = array[k]
        }

    })
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function makeTitle(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1))
}