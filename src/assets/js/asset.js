import { postData } from "./api"
import { MODULES } from "/src/assets/data/globals.json"

export async function delete_asset(data,  db){
    let result = await postData(MODULES.ASSET, null, [['request', 'validate_delete_asset_request'], ['data', data], ['db', db]])
    return result
}

export async function upsert_assert(data){
    let result = await postData(MODULES.ASSET, null, [['request', 'validate_upsert_asset'], ['details', data]])
    return result
}

export async function get_asset_os(){
    let result = await postData(MODULES.ASSET, null, [['request', 'retrieve_asset_os']])
    return result
}

export async function get_asset_type(){
    let result = await postData(MODULES.ASSET, null, [['request', 'retrieve_asset_type']])
    return result
}

export async function get_asset_environment(){
    let result = await postData(MODULES.ASSET, null, [['request', 'retrieve_asset_environment']])
    return result
}

export async function get_asset_list(data, page){
    let result = await postData(MODULES.ASSET, null, [['request', 'retrieve_asset_list'], ['details', data], ['page',page]])
    return result
}