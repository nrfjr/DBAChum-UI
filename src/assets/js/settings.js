import axios from 'axios'
import { API_SOURCE } from './globals'
import { resultHandler } from './tools'

/***  
 * 
 *      Function for Advance setting related vues, this include the following:
 * 
 * 
***/


export async function updateEmailURLToAPI(url) {

    let result = await axios.post(
        `${API_SOURCE}/advanceSettings`,
        new URLSearchParams([['request', btoa('validate_new_URL')], ['url', btoa(url)]])
    )

    return result

}

export async function updateAPIServerURL(url) {

    let result = await testLink(url)
    if (result <= 200) {
        localStorage.setItem("customAPI", url)
        return resultHandler(true, 'Server API URL has been updated')
    }
    return resultHandler(false, 'Unable to update Server API')
}


async function testLink(url) {

    let result = null
    await axios.post(`${url}/Test`, new URLSearchParams([['request', btoa('test_connection')]])).then((e) => {
        result = e.status
    }).catch(function (e) {
        result = e.status
    })

    return result
}

export async function getEmailURLFromAPI() {

    let result = await axios.post(
        `${API_SOURCE}/advanceSettings`,
        new URLSearchParams([['request', btoa('retrieve_email_URL')]])
    );
    return result
}

export function getAPIServerURL() {

    let result = API_SOURCE
    return result

}

/***  
 * 
 *      Function for Connection setting related vues, this include the following:
 * 
 *      * upsertConnectionToAPI - async function for inserting connection data.
 *      * getConnectionsHosts - async function to retrieve existing connection hosts.
 *      * getAvailableDB - async function to retrieve available database.
 *      * getExistingConnections - async function for getting complete details of
 *                                  existing connection upon selecting available
 *                                  database.
 *      * deleteConnection - removes connection data.
 * 
***/

export async function upsertConnectionToAPI(db, data) {
    let result = await axios.post(
        `${API_SOURCE}/dBConnection`,
        new URLSearchParams([['request', btoa('validate_new_database_connection')], ['data', btoa(data)], ['db', btoa(db)]])
    )
    return result
}

export async function getAvailableDB() {
    let result = await axios.post(
        `${API_SOURCE}/dBConnection`,
        new URLSearchParams([['request', btoa('retrieve_available_databases')]])
    )
    return result
}

export async function getExistingConnections(db) {
    let result = await axios.post(
        `${API_SOURCE}/dBConnection`,
        new URLSearchParams([['request', btoa('retrieve_existing_database_connections')], ['db', btoa(db)]])
    )
    return result
}

export async function deleteConnection(db, Id) {
    let result = await axios.post(
        `${API_SOURCE}/dBConnection`,
        new URLSearchParams([['request', btoa('validate_database_connection_delete_request')], ['Id', Id], ['db', db]])
    )
    return result
}

export async function updateDefaultDB(db, Id) {

    let result = await axios.post(
        `${API_SOURCE}/dBConnection`,
        new URLSearchParams([['request', btoa('validate_default_update')], ['Id', btoa(Id)], ['db', btoa(db)]])
    )
    return result
}

/***  
 * 
 *      Function for Disk Server setting related vues, this include the following:
 * 
 *      * upsertConnectionToAPI - async function for inserting connection data.
 *      * getConnectionsHosts - async function to retrieve existing connection hosts.
 *      * getAvailableDB - async function to retrieve available database.
 *      * getExistingConnections - async function for getting complete details of
 *                                  existing connection upon selecting available
 *                                  database.
 *      * deleteConnection - removes connection data.
 * 
***/

export async function upsertDiskServerToAPI(type, data) {
    let result = await axios.post(
        `${API_SOURCE}/disks`,
        new URLSearchParams([['request', btoa('validate_new_server_profile')], ['data', btoa(data)], ['server_type', btoa(type)]])
    )
    return result
}

export async function getExistingDiskServers(type) {
    let result = await axios.post(
        `${API_SOURCE}/disks`,
        new URLSearchParams([['request', btoa('retrieve_existing_server_profiles')], ['server_type', btoa(type)]])
    )
    return result
}

export async function deleteDiskServer(type, Id) {
    let result = await axios.post(
        `${API_SOURCE}/disks`,
        new URLSearchParams([['request', btoa('validate_server_profile_delete_request')], ['Id', btoa(Id)], ['server_type', btoa(type)]])
    )
    return result
}