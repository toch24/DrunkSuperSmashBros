import React from 'react';
import "./Home.css";
import loading from "../images/808.gif";

import socket from './socketConfig';
import {withRouter} from './withRouter';

class WaitPlaying extends React.Component {
    constructor(props) {
        super(props);
        this.state = {code: localStorage.getItem('code'), message: "", name: this.props.params.name,
                        winner:"Yuki", showChallenge: false}
        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            console.log(data)
            if(data['event_type'] === 'finish_play') // this is called after a winner is provided
                this.setState({winner: JSON.parse(data['message'])})
        }

        this.setState({winner: "Yuki"}) //JUST FOR TESTING

        console.log("Before if "+ this.state.winner)
        if (this.state.winner != "") {
            console.log("In if")
            socket.send('bet_challenge,'+this.state.code+','+this.state.name+','+this.state.winner)
            socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            console.log(data)
            if(data['event_type'] === 'bet_challenge'){ // this is called after a winner is provided
                let win = JSON.parse(data['message'])
                if (!win)
                    // window.location.assign("/betting")
                    this.props.navigate(`/betchallenge/${this.props.params.name}`);
                else
                    this.props.navigate(`/betwin/${this.props.params.name}`);
            }
            }
        }
    }

    render(){
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