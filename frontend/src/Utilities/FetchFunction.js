import Axios from "axios";
import {fetch_url} from "../index";
// import {useHistory} from 'react-router';

// const history = useHistory();

export async function get_test() {
    const response = await Axios.get(`${fetch_url}/test`)
    return await response.data
}

// export async function post_lobbyOwner(form) {
//     await Axios ({
//             method:'POST',
//             url: `${fetch_url}/lobby`,
//             data: form
//         }).then((response) => {
//             console.log(response.data);
//             history.push('/');
//         })
// }