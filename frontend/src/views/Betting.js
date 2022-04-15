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
        this.state = {bet: 0, isSubmitted: false, players: [], code: "",
            betFor: "", message: "", name: ""}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIn = this.handleIn.bind(this);

        console.log(localStorage.getItem('name2')) // need another way to get name
        this.state.name = localStorage.getItem('name2')
        console.log(this.state.name)
        this.state.code = localStorage.getItem('code')

        socket.send('betting,'+this.state.code)
        console.log("before onmessage")
        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            console.log("in onmessage")
            console.log(data)
            if(data['event_type'] === 'betting'){
                // localStorage.setItem('code', this.state.code)
                // localStorage.setItem('host', false)
                let betted_players = JSON.parse(data['message'])
                this.setState({players: betted_players})
            }
        }

        console.log(this.state.players)
    }

    handleIn = (e) => {
        e.preventDefault();
        this.props.navigate("/waitplaying")
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
            this.props.navigate("/waitplaying")
    }

    render(){
        const isSubmitted = this.state.isSubmitted;
        
        
        while (!isSubmitted)
        {
            // this.state.name = localStorage.getItem('name2')

            // let url = `ws://127.0.0.1:8080/ws/socket/bet_for/?room_code=${this.state.code};username=${this.state.name};betfor=${this.state.betFor}`

            // const socket = new WebSocket(url)

            // socket.onmessage = (e) => {
            //     let data = JSON.parse(e.data)
            //     if(data['event_type'] === 'player_betted'){
            //         // localStorage.setItem('code', this.state.code)
            //         // localStorage.setItem('host', false)
            //         let betted_players = JSON.parse(data['message'])
            //         this.setState({players: betted_players})
            //         this.setState({isSubmited: true})
            //     }
            // }
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

        // if (isSubmitted) {
        //     return (
        //         this.handleIn
        //     )
        // }
    }
}
export default withRouter(Betting)