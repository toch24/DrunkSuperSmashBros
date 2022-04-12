import React from 'react';
import { useState } from 'react';
import "./Home.css";

class JoinForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', code:''};
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

        socket.onmessage = function(e){
            let data = JSON.parse(e.data)
            console.log(data)
            //need to set newCode value with data here
            //also need to redirect the client to a room page
        }
    }

    render() {
        return (
            <form className='cl-form' onSubmit={this.handleSubmit}>
                Enter Your Name: <br/> <br/>
                <input className='textBox' type="text" name='name' value={this.state.name} onChange={this.handleChange}/>
                <br/> <br/>
                Enter Lobby Code: <br/> <br/>
                <input className='textBox' type="text" name='code' value={this.state.code} onChange={this.handleChange}/>
                <br/> <br/>
                <input className='my-submit' type="submit" value="Join Lobby"/>
            </form>
        );
    }
}

export default JoinForm