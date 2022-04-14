import React, {useCallback, useEffect, useState, useReducer} from 'react';
import { useNavigate } from 'react-router-dom'
import { post_data,} from '../Utilities/FetchFunction';
import "./Home.css";
import loading from "../images/808.gif"
import socket from "./socketConfig"
import AfterLobby from './AfterLobby';


function CreateLobbyForm() {

    const [state, setState] = useReducer(infoReducer, initialValues)
    const history = useNavigate();

    const handleChange = (e) => {
        e.preventDefault()
        console.log("change occur");
        setState({name: e.target.value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //saving name in local storage for future use
        localStorage.setItem('name', state.name)
        
        //establishing connection to a new websocket, the url used most likely has to change when publishing the website.
        let s = get_code()

        setState({players: [...state.players, state.name]})

        if(s === 200){
            setState({isSubmitted: true})
        }
        else{
            console.log("I SHOULDNT BE HERE")
            setState({isSubmitted: false})
        }



        //creating form to send data to the backend
       let form_data = new FormData()
       let keys = Object.keys(state)
       keys.forEach(key => {
           form_data.append(key, state[key])
       })
       post_data(form_data, "new_lobby") 
        
    }

    const handleIn = (e) => {
        e.preventDefault()

        socket.send("everyone_in")
        history('/afterlobby');

      }

    function get_code() {
        console.log(state.name);

        socket.send("create_lobby,"+state.name)


        socket.onmessage = (e) => {
                let data = JSON.parse(e.data)
                console.log(data)
                if(data['event_type'] === 'lobby_code'){
                    
                    localStorage.setItem('code', data['message'])
                    localStorage.setItem('host', true)
                    setState({newCode: data['message']})
                }
                else if(data['event_type'] === 'player_joined'){
                    console.log(data['message'])
                    let joined_players = JSON.parse(data['message'])
                    setState({players: joined_players})

                }
      
        }

        return 200
        
    }

        if (state.isSubmitted) {
            return (
                <div className = 'lobby'>
       
                <h2>GAME CODE: {state.newCode}</h2>
                <div className = 'joined-players'>
                    <p>Current joined players:</p>
                    { state.players.map((val) =>
                    <div className="">
                        <p key={val}>{val}</p>
                    </div>
                    )}
                </div>
                <div>
                    <img className = 'loading' src={loading} alt=" " />
                </div>
                
                <button className='everyone' type="submit" onClick={handleIn}> Everyone's In! </button> 
                
                </div>
            )
        }
        else {
            return (
                <>
                Enter Your Name: <br/> <br/>
                <input className='textBox' type="text" value={state.name} onChange={handleChange}/>
                <br/> <br/>
                <input className='my-submit' type="submit" onClick={handleSubmit} value="Create Lobby"/>
                </>
            )
        }
    }


export default CreateLobbyForm


const initialValues = {
    name: '',
    isSubmitted: false,
    newCode: '',
    players: []
};

const infoReducer = (state, action) => {
    return {
        ...state,
        ...action
    }
}