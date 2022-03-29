import React from 'react';
import { useState } from 'react';
import { create_lobby } from '../../Utilities/FetchFunction';
import "./Home.css";

class CreateLobbyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', isSubmitted: false, newCode: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleStart = this.handleStart.bind(this);
    }

    handleChange(event) {
        console.log("change occur");
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        this.setState({isSubmitted: true});
        this.setState({newCode: "TestCode"});
        event.preventDefault();
        console.log(this.state.name);

 
    }

    handleStart(event){
       event.preventDefault();
       //creating form to send data to the backend
       let form_data = new FormData()

       let keys = Object.keys(this.state)
       keys.forEach(key => {
           form_data.append(key, this.state[key])
       })
       create_lobby(form_data)        
    }

    render() {
        const isSubmitted = this.state.isSubmitted;
        let returnContent;

        if (isSubmitted) {
            returnContent = (
                <div className='cl-form'>
                    Your Code is: <br/> <br/> <br/>
                    <div className='show-code'>
                        {this.state.newCode}
                    </div> <br/> <br/>
                    <button className='my-button' onClick={this.handleStart}>Start Game</button>
                </div> 
            );
        }
        else {
            returnContent = (
            <form className='cl-form' onSubmit={this.handleSubmit}>
                Enter Your Name: <br/> <br/>
                <input className='textBox' type="text" value={this.state.name} onChange={this.handleChange}/>
                <br/> <br/>
                <input className='my-submit' type="submit" value="Create Lobby"/>
            </form>);
        }
        return returnContent;
    }
}

export default CreateLobbyForm