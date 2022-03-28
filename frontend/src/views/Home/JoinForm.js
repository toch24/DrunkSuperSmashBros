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