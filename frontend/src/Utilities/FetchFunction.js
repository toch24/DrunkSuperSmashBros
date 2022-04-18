import Axios from "axios";
import {fetch_url} from "../index";



export async function post_data(body, route) {
    Axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    Axios.defaults.xsrfCookieName = "csrftoken";
    const response = await Axios.post(`${fetch_url}/${route}/`, body, {
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

export async function get_rand_challenge(){
    const response = await Axios.get(`${fetch_url}/get_rand_challenge`)
    
    return response.data
}
