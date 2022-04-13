import React, {useEffect, useState} from 'react';
import { Redirect } from 'react-router-dom';
import { post_data,} from '../Utilities/FetchFunction';
import "./Home.css";
import loading from "../images/808.gif"
import { useHistory } from "react-router"

class CreateLobbyForm extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {name: '', isSubmitted: false, newCode: '', players: []}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleIn = this.handleIn.bind(this);


    }
    

    handleChange(event) {
        console.log("change occur");
        this.setState({name: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        //saving name in local storage for future use
        localStorage.setItem('name', this.state.name)
        localStorage.setItem('name2', this.state.name)
        
        //establishing connection to a new websocket, the url used most likely has to change when publishing the website.
        let response = this.get_code()

        if(response === 200){
            this.setState({isSubmitted: true})
        }
        else{
            this.setState({isSubmitted: false})
        }

        let p = this.state.players;
        p.push(this.state.name)
        console.log(this.state.players)

        //creating form to send data to the backend
       let form_data = new FormData()
       let keys = Object.keys(this.state)
       keys.forEach(key => {
           form_data.append(key, this.state[key])
       })
       post_data(form_data, "new_lobby") 
        
    }

    handleIn = (e) => {
        e.preventDefault();
        window.location.assign("/afterlobby")

      }

    get_code(){
        console.log(this.state.name);

        //pass the username
        let url = `ws://127.0.0.1:8080/ws/socket/new_lobby/?username=${this.state.name}`
        const socket = new WebSocket(url)
        localStorage.removeItem('code')
        console.log(localStorage.getItem('code'))
        socket.onmessage = (e) => {
                let data = JSON.parse(e.data)
                console.log(data)
                if(data['event_type'] === 'lobby_code'){
                    localStorage.setItem('code', data['message'])
                    this.setState(...this.state.newCode, {newCode: data['message']})
                }
                else if(data['event_type'] === 'player_joined'){
                    console.log(data['message'])
                    let joined_players = JSON.parse(data['message'])
                    this.setState({players: joined_players})

                }
        }
   
        return 200
    }


    
    render() {
        const isSubmitted = this.state.isSubmitted;
        let returnContent;
       
        
        if (isSubmitted) {
 
            returnContent = (
                <div className = 'lobby'>
       
                <h2>GAME CODE: {this.state.newCode}</h2>
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
                
                <button className='everyone' type="submit" onClick={this.handleIn}> Everyone's In!</button>
                
                </div>
            )
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