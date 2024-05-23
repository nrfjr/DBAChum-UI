import { postData } from "./api"
import { MODULES } from "/src/assets/data/globals.json"

export async function get_disk_space(id, type, unit,  page){
    let result = await postData(MODULES.DISK, null, [['request', 'retrieve_server_disk_size'], ['Id', id], ['server_type', type], ['unit', unit], ['page', page]])
    return result
}

export async function get_existing_ip(type){
    let result = await postData(MODULES.DISK, null, [['request', 'retrieve_existing_server_profiles'], ['server_type', type]])
    return result
}

export async function upsert_disk_server(data, type){
    let result =  await postData(MODULES.DISK, null, [['request', 'validate_new_server_profile'], ['data', data], ['server_type', type]])
    return result
}

export async function get_existing_disk_server_profiles(type){
    let result = await postData(MODULES.DISK, null, [['request', 'retrieve_existing_server_profiles'], ['server_type', type]])
    return result
}

export async function delete_disk_server_profile(id, type){
    let result = await postData(MODULES.DISK, null, [['request', 'validate_server_profile_delete_request'], ['Id', id], ['server_type', type]])
    return result
}
