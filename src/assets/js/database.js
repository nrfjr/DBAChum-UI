import { postData } from "./api"
import { MODULES } from "/src/assets/data/globals.json"

export async function get_available_db_type(){
    let result = await postData(MODULES.DBCONN, null, [['request', 'retrieve_available_databases']])
    return result
}

export async function get_existing_db_connection(db){
    let result = await postData(MODULES.DBCONN, null, [['request', 'retrieve_existing_database_connections'], ['db', db]])
    return result
}

export async function upsert_db_connection_profile(data, db){
    let result = await postData(MODULES.DBCONN, null, [['request', 'validate_new_database_connection'], ['data', data], ['db', db]])
    return result
}

export async function delete_db_connection_profile(id, db){
    let result  = await postData(MODULES.DBCONN, null, [['request', 'validate_database_connection_delete_request'], ['Id', id], ['db', db]])
    return result
}