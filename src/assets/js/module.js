import { postData } from "./api"
import { MODULES } from "../data/globals.json"

export async function get_sidebar_modules(){
    let result = await postData(MODULES.MODULE, null, [['request', 'retrieve_modules']])
    return result
}

export async function update_sidebar_modules(data){
    let result = await postData(MODULES.MODULE, null, [['request', 'update_modules'], ['update', data]])
    return result
}