import { postData } from "./api"
import { MODULES } from "../data/globals.json"

export async function get_existing_application_users(page){
    let result = await postData(MODULES.APPS, null, [['request', 'retrieve_existing_application_users'], ['page', page]])
    return result
}