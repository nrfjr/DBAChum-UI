import global_data from '../data/globals.json' assert {type: 'json'}

export const API_SOURCE = getAPISource()

function getAPISource() {
    let customAPIURL = localStorage.getItem("customAPI")
    if (customAPIURL) {
        return customAPIURL
    }
    return global_data["API SOURCE"]
}

export const ICON_PREFIX = global_data["ICON PREFIX"]

