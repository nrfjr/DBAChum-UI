import axios from 'axios'
import { API_SOURCE } from './globals'

export async function getServerDiskSpace(type, Id, unit, page) {
    let result = await axios.post(
        `${API_SOURCE}/disks`,
        new URLSearchParams([['request', btoa('retrieve_server_disk_size')], ['Id', btoa(Id)], ['server_type', btoa(type)], ['unit', btoa(unit)], ['page', btoa(page)]])
    )

    return result
}

