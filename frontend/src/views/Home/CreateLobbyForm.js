import React from 'react';
import { useState } from 'react';
import "./Home.css";
import {fetch_url} from "../../index";
import Axios from "axios";

class CreateLobbyForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: '', isSubmitted: false, newCode: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        console.log("change occur");
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        let formData = new FormData();

        this.setState({isSubmitted: true});
        this.setState({newCode: "TestCode"});

        formData.append('lobbyOwnerName', this.state.name);
        formData.append('RoomCode', this.state.newCode);

        Axios.defaults.xsrfHeaderName = "X-CSRFToken";
        Axios.defaults.xsrfCookieName = "csrftoken";
        Axios({
            method: "post",
            url: `${fetch_url}/lobbyowner/`,
            data: formData,
            // headers: { "Content-Type": "multipart/form-data" },
          })
            .then(function (response) {
              //handle success
              console.log(response);
            })
            .catch(function (response) {
              //handle error
              console.log(response);
            });

        // Axios
        //     .post("http://127.0.0.1:8000/lobbyowner/", {
        //         lobbyOwnerName: this.state.name,
        //         RoomCode: this.state.newCode,
        //     })
        //     .then((res) => {
        //         console.log(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        event.preventDefault();
        console.log(this.state.name);
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
                    <button className='my-button'>Start Game</button>
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