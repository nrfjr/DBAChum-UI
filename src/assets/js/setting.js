import { postData, testLink } from "./api"
import { MODULES } from "../data/globals.json"

export async function get_email_url(){
    let result = await postData(MODULES.SETTING, null, [['request', 'retrieve_email_URL']])
    return result
}

export async function update_email_url(url){
    let result = await postData(MODULES.SETTING, null, [['request', 'validate_new_URL'], ['url', url]])
    return result
}

export async function test_link(url){
    let result = await testLink('Test', url, [['request', 'test_connection']])
    return result
}

export async function update_default_db(id, db) {
    let result = await postData(MODULES.SETTING, null, [['request', 'validate_default_update'], ['Id', id], ['db', db]])
    return result
}
