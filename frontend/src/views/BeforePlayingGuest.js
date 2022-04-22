import React from 'react';
import "./Home.css";
import loading from "../images/808.gif"
import socket from './socketConfig';
import {withRouter} from './withRouter';

class BeforePlayingGuest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: this.props.params.name, code: sessionStorage.getItem('code'), isSubmited: false};
        socket.send('wait_join,'+this.state.code+','+this.state.name)

        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            console.log(data)
            if(data['event_type'] === 'everyone_ready'){
                let ready = JSON.parse(data['message'])
                console.log(ready)
                if (ready === true)
                    this.props.navigate(`/selectcharsguest`);
                else
                    console.log("Waiting...")
            }
        }

    }

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


export default withRouter(BeforePlayingGuest)