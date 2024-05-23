import axios from 'axios'
import { API_SOURCE } from '/src/assets/data/globals.json'

export async function postData(module, url,  params){

    let result = await axios.post(`${ (url) ? url : API_SOURCE }/${module}`, new URLSearchParams(params.map(([k,v]) => [k, btoa(v)])))
    return result

}

export async function postFile(request, module, url, files){
    
    let result =  await axios.post(`${ (url) ? url : API_SOURCE }/${module}/${btoa(request)}`, files, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

}

export async function testLink(module, url, params) {

    let result = null
    await axios.post(`${url}/${module}`, new URLSearchParams(params.map(arr => btoa(arr[1])))).then((e) => {
        result = e.status
    }).catch(function (e) {
        result = e.status
    })

    if (result <= 200) {
        localStorage.setItem("customAPI", url)
        return resultHandler(true, 'Server API URL has been updated')
    }
    return resultHandler(false, 'Unable to update Server API')

}

export function resultHandler(status, response) {
    if (status) {
        return { status: status, message: response }
    }
    return { status: status, error: response }
}
