import axios from "axios";
import { API_SOURCE } from "./globals";

export async function getProfileImage() {
    let result = await axios.post(`${API_SOURCE}/Resources`,
        new URLSearchParams([['request', btoa('get_profile_image')]])
    )

    return result
}

export async function updatePreferences(files) {

    let result = await axios.post(`${API_SOURCE}/resources/${btoa('save_preference')}`, files, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return result
}

export async function getLogoImage() {

    let result = await axios.post(
        `${API_SOURCE}/resources`,
        new URLSearchParams([['request', btoa('get_logo_image')]])
    )

    return result
}


