import Axios from "axios";
import {fetch_url} from "../index";

export async function get_test() {
    const response = await Axios.get(`${fetch_url}/test`)
    return await response.data
}