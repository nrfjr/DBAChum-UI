export function clearObject(obj) {
    Object.keys(obj).forEach((key) => {
        obj[key] = ''
    })
}

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

export function resultHandler(status, response) {
    if (status) {
        return { status: status, message: response }
    }
    return { status: status, error: response }
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function makeTitle(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1))
}
