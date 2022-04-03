import Axios from "axios";
import {fetch_url} from "../index";



export async function create_lobby(body) {
    Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    Axios.defaults.xsrfCookieName = "csrftoken";
    const response = await Axios.post(`${fetch_url}/new_lobby/`, body, {
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    })

    return await response.data
}

export async function get_char_data(){
    const response = await Axios.get(`${fetch_url}/get_char_data`)
    
    return response.data
}

export async function get_room_code(code){
    
    return await code
}

export function get_code(){
    const socket = new WebSocket(`ws://127.0.0.1:8080/ws/socket/`)


    socket.onmessage = function(e){
        let data = JSON.parse(e.data)
        get_room_code(data['message'])
        console.log(data)
        //need to set newCode value with data here
        //also need to redirect the client to a room page
    }

    return 200
}