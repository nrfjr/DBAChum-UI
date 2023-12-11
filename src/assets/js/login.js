import axios from 'axios'
import { API_SOURCE } from './globals';
import su from '../data/admin.json' assert {type: 'json'}

export async function validateLogin(username, password) {


    // let loginDetails = await axios.post(
    //     `${API_SOURCE}/Login.php`,
    //     new URLSearchParams([['request', 'getUserDetails'], ['username', window.btoa(username)]])
    // );

    if ((su["password"] == password) && (su["username"] == username)) {
        return true
    }
    return false

}
