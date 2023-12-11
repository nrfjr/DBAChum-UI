import axios from "axios";
import { API_SOURCE } from "./globals";

export async function getModules() {

    let response = await axios.post(
        `${API_SOURCE}/modules`,
        new URLSearchParams([['request', btoa('retrieve_modules')]])
    );

    return response;
}

export async function updateModules(update) {

    let response = await axios.post(
        `${API_SOURCE}/modules`,
        new URLSearchParams([['request', btoa('update_modules')], ['update', btoa(update)]])
    );

    return response;
}