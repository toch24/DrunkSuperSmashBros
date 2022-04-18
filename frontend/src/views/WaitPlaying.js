import React from 'react';
import "./Home.css";
import loading from "../images/808.gif";

import socket from './socketConfig';
import {withRouter} from './withRouter';

class WaitPlaying extends React.Component {
    constructor(props) {
        super(props);
        this.state = {code: localStorage.getItem('code'), message: "", name: this.props.params.name,
                        finish_play: false, showChallenge: false}
        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            console.log(data)
            if(data['event_type'] === 'finish_play') // this is called after a winner is provided
                this.setState({finish_play: true})
        }
    }

    render(){
        // ADD CODE HERE WHEN finish_play is true
        // socket.send('bet_challenge,'+this.state.code+','+this.state.name)
        // socket.onmessage = (e) => {
        //     let data = JSON.parse(e.data)
        //     console.log(data)
        //     if(data['event_type'] === 'bet_challenge'){ // this is called after a winner is provided
        //         let win = JSON.parse(data['message'])
        //         if (win)
        //             // window.location.assign("/betting")
        //             this.props.navigate(`/betchallenge/${this.props.params.name}`);
        //         else
        //             this.props.navigate(`/betwin/${this.props.params.name}`);
        //     }
        // }
        return (
            <div className='wait-playing'>
                <div className='wait-playing'>
                    Waiting for other players to finish the challenges
                </div>
                <div>
                    <img className = 'loading' src={loading} alt=" " />
                </div>
            </div>)
    }
}
export default withRouter(WaitPlaying)