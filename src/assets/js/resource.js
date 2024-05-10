import { postData, postFile } from "./api"
import { MODULES } from "../data/globals.json"

export async function get_profile_image(){
    let result = await postData(MODULES.RESOURCE, null, [['request', 'get_profile_image']])
    return result
}

export async function get_logo_image(){
    let result = await postData(MODULES.RESOURCE, null, [['request', 'get_logo_image']])
    return result
}

export async function update_preference(request, data){
    let result = await postFile(request, MODULES.RESOURCE, null, data)
    return result
}