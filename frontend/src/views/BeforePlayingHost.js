import React from 'react';
import "./Home.css";
import loading from "../images/808.gif"
import socket from './socketConfig';
import {withRouter} from './withRouter';

class BeforePlayingHost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: this.props.params.name, code: sessionStorage.getItem('code'), isSubmited: false};
        // let history = useNavigate();
        socket.send('wait_join,'+this.state.code+','+this.state.name)
        console.log(this.state.code);
        console.log(this.props.params);
        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            console.log(data)
            if(data['event_type'] === 'everyone_ready'){
                let ready = JSON.parse(data['message'])
                console.log(ready)
                if (ready == true)
                    // window.location.assign("/betting")
                    this.props.navigate(`/selectcharshost`);
                else
                    console.log("Waiting...")
            }
        }
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    // handleSocket(event) {
    //     console.log("TESTTTtTTTTTT")
    //     socket.send('wait_bet,'+this.state.code+','+this.state.name)

    //     socket.onmessage = (e) => {
    //         let data = JSON.parse(e.data)
    //         console.log(data)
    //         if(data['event_type'] === 'wait_bet'){
    //             let everyone_in = JSON.parse(data['message'])
    //             console.log(everyone_in)
    //             if (everyone_in)
    //                 window.location.assign("/betting")
    //             else
    //                 console.log("Waiting...")
    //         }
    //     }
    // }

    render() {
        return (
        <div className='wait-betting'>
            <div className='wait-betting'>
                Waiting for other players
            </div>
            <div>
                <img className = 'loading' src={loading} alt=" " />
            </div>
        </div>)
    }
}


export default withRouter(BeforePlayingHost)