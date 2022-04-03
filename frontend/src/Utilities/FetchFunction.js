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

export function get_code(){
    const socket = new WebSocket(`ws://127.0.0.1:8080/ws/socket/`)

    socket.addEventListener = function(e){
        setTimeout(
            function () {
                if (socket.readyState === 1) {
                    console.log("Connection is made") 
                    let data =  JSON.parse(e.data)
                    localStorage.setItem('code', data.roomCode)
                    
                } else {
                    console.log("wait for connection...")
                    setTimeout();
                }
    
            }, 5); // wait 5 milisecond for the connection...
    }


    return 200
}