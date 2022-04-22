import React, {useEffect, useState} from 'react';
import "./Home.css";
import { useParams } from "react-router-dom";
import { post_data,} from '../Utilities/FetchFunction';
import JoinForm from './JoinForm';
import socket from './socketConfig';
import {withRouter} from './withRouter';

class Betting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {bet: 0, isSubmitted: false, players: [], code: sessionStorage.getItem('code'),
            betFor: "", message: "", name: this.props.params.name}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        socket.send('betting,'+this.state.code)
        console.log("before onmessage")
        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            console.log("in onmessage")
            console.log(data)
            if(data['event_type'] === 'betting'){
                let betted_players = JSON.parse(data['message'])
                this.setState({players: betted_players})
            }

            if(data['event_type'] === 'end_lobby'){
                window.location.assign("/")
            }
        }
    }

    handleChange(event) {
        console.log("change occur");
        // this.setState({name: event.target.value});
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();

        if(!this.state.players.includes(this.state.betFor)){
            this.setState({message: "Please enter player name in the list."})
            this.setState({isSubmitted: false})
        }
        else {
            this.setState({isSubmitted: true})
            this.setState({message: ""})
        }

        console.log(this.state.message)

        if(this.state.players.includes(this.state.betFor))
        {
            socket.send('bet_for,'+this.state.code+','+this.state.name+','+this.state.betFor)
            console.log("before onmessage")
            socket.onmessage = (e) => {
                let data = JSON.parse(e.data)
                console.log("in onmessage")
                console.log(data)
                if(data['event_type'] === 'bet_for'){
                    let betted_players = JSON.parse(data['message'])
                    console.log(betted_players)
                    // this.props.navigate(`/waitplaying/${this.props.params.name}`)
                }
            }

            this.props.navigate(`/waitplaying/${this.props.params.name}`)
        }
    }

    render(){
        const isSubmitted = this.state.isSubmitted;
        
        
        while (!isSubmitted)
        {
            return(
                <div className = "betting">
                    <form className='bt-form' onSubmit={this.handleSubmit}>
                        Bet for Players: { this.state.players.map((val) =>
                        <div>
                            <p key={val}>{val}</p>
                        </div>
                        )}
                        Enter who you want to bet for: <br/>
                        <input className='textBox' type="text" name='betFor' value={this.state.betFor} onChange={this.handleChange}/>
                        {/* <br/>Enter the amount to bet: <br/> */}
                        {/* <input className='textBox' type="text" name='bet' value={this.state.bet} onChange={this.handleChange}/> */}
                        <br/> <br/>
                        <input className='my-submit' type="submit" value="Submit"/>
                    </form>

                    {this.state.message}
                </div>
            )
        }

    }
}
export default withRouter(Betting)