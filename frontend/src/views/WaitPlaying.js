import React from 'react';
import "./Home.css";
import loading from "../images/808.gif";
import socket from './socketConfig';
import {withRouter} from './withRouter';

class WaitPlaying extends React.Component {
    constructor(props) {
        super(props);
        this.state = {code: sessionStorage.getItem('code'), message: "", name: this.props.params.name,
                        winner:"", showChallenge: false}

        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            if(data['event_type'] === 'player_won'){ // this is called after a winner is provided
                let win = data['message']
                this.setState({winner: win})
                socket.send('bet_challenge,'+this.state.code+','+this.state.name+','+this.state.winner)
                socket.onmessage = (e) => {
                    let data = JSON.parse(e.data)
                    console.log(data)
                    if(data['event_type'] === 'bet_challenge'){ // this is called after a winner is provided
                        if (data['message'] === this.state.name){
                            console.log("NOT WIN")
                            this.props.navigate(`/betchallenge/${this.props.params.name}`);
                        }

                    }
                    if(data['event_type'] === 'bet_win'){
                        if(data['message'] === this.state.name){
                            this.props.navigate(`/betwin/${this.props.params.name}`);
                        }
                            
                    }
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