import { postData } from "./api"
import { MODULES } from "/src/assets/data/globals.json"

export async function get_existing_application_users(page){
    let result = await postData(MODULES.APPS, null, [['request', 'retrieve_existing_application_users'], ['page', page]])
    return result
}

export async function upsert_application_user(data){
    let result = await postData(MODULES.APPS, null, [['request', 'validate_new_application_user'], ['data', data]])
    return result
}

export async function delete_application_user(id){
    let result = await postData(MODULES.APPS, null, [['request', 'validate_application_user_delete_request'], ['Id', id]])
    return result
}