import React from 'react';
import { useState } from 'react';
import "./Home.css";
import loading from "../images/808.gif"

class JoinForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', code:'', isSubmited: false, players: []};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("change occur");
        const value = event.target.value;
        this.setState({[event.target.name] : event.target.value});
    }

    handleSubmit(event) {
        const { name, code } = this.state
        event.preventDefault();
        console.log(this.state.name);
        console.log(this.state.code);
        localStorage.setItem('name2', this.state.name);

        //pass the roomcode and username
        let url = `ws://127.0.0.1:8080/ws/socket/join_lobby/?room_code=${this.state.code};username=${this.state.name}`

        const socket = new WebSocket(url)

        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            if(data['event_type'] === 'player_joined'){
                let joined_players = JSON.parse(data['message'])
                this.setState({players: joined_players})
                this.setState({isSubmited: true})
            }
        }
    }

    render() {
        const isSubmitted = this.state.isSubmited;
        let returnContent;
        if (isSubmitted){
            returnContent = (
                <div className = 'lobby'>
       
                <h2>GAME CODE: {this.state.code}</h2>
                <div className = 'joined-players'>
                    <p>Current joined players:</p>
                    { this.state.players.map((val) =>
                    <div className="">
                        <p key={val}>{val}</p>
                    </div>
                    )}
                </div>
                <div>
                    <img className = 'loading' src={loading} alt=" " />
                </div>
                
                </div>
            )
        }
        else{
            returnContent = (
                <form className='cl-form' onSubmit={this.handleSubmit}>
                Enter Your Name: <br/> <br/>
                <input className='textBox' type="text" name='name' value={this.state.name} onChange={this.handleChange}/>
                <br/> <br/>
                Enter Lobby Code: <br/> <br/>
                <input className='textBox' type="text" name='code' value={this.state.code} onChange={this.handleChange}/>
                <br/> <br/>
                <input className='my-submit' type="submit" value="Join Lobby"/>
            </form>
            )
        }

        return returnContent;
    }
}

export default JoinForm