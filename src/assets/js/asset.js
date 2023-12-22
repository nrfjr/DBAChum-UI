import axios from 'axios'
import { API_SOURCE } from './globals'

/***  
 * 
 *      Function for Asset Management related vues, this include the following:
 * 
 *      * getAssetList - 
 *      * getAssetType - 
 *      * getAssetOS - 
 *      * getAssetEnvironment -
 *      * upsertAsset - 
 *      * deleteAsset - 
 * 
***/

export async function getAssetList(data, page) {
    let result = await axios.post(
        `${API_SOURCE}/assets`,
        new URLSearchParams([['request', btoa('retrieve_asset_list')], ['details', btoa(data)], ['page', btoa(page)]])
    )
    return result
}

export async function getAssetType() {
    let result = await axios.post(
        `${API_SOURCE}/assets`,
        new URLSearchParams([['request', btoa('retrieve_asset_type')]])
    )
    return result
}

export async function getAssetOS() {
    let result = await axios.post(
        `${API_SOURCE}/assets`,
        new URLSearchParams([['request', btoa('retrieve_asset_os')]])
    )
    return result
}

export async function getAssetEnvironment() {
    let result = await axios.post(
        `${API_SOURCE}/assets`,
        new URLSearchParams([['request', btoa('retrieve_asset_environment')]])
    )
    return result
}

export async function upsertAsset(data) {
    let result = await axios.post(
        `${API_SOURCE}/assets`,
        new URLSearchParams([['request', btoa('validate_upsert_asset')], ['details', btoa(data)]])
    )
    return result
}

export async function deleteAsset(db, data) {
    let result = await axios.post(
        `${API_SOURCE}/assets`,
        new URLSearchParams([['request', 'validate_delete_asset_request'], ['data', data], ['db', db]])
    )
    return result
}
