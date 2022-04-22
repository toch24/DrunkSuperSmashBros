import React from 'react';
import { useReducer } from 'react';
import "./Home.css";
import loading from "../images/808.gif"
import socket from './socketConfig';
import { useNavigate } from 'react-router-dom'

function JoinForm() {
    const [state, setState] = useReducer(infoReducer, initialValues)
    const history = useNavigate();

    const handleChange = (e) => {
        console.log("change occur");
        const value = e.target.value;
        setState({[e.target.name] : e.target.value});
    }

    const handleSubmit = (e)  => {
        e.preventDefault();

        sessionStorage.setItem('name', state.name);

        socket.send('join,'+state.code+','+state.name)
        
        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            console.log(data)
            if(data['event_type'] === 'player_joined'){
                sessionStorage.setItem('code', state.code)
                sessionStorage.setItem('host', false)
                let joined_players = JSON.parse(data['message'])
                setState({players: joined_players})
                setState({isSubmitted: true})
            }
            else if(data['event_type'] === 'everyone_in'){
                history('/afterlobbyguest', {
                    state: {
                        name: state.name
                    }
                })
            }
            else if(data['event_type'] === 'invalid_name'){
                setState({errorCode: data['message']})
                setState({name: ''})
            }
        }
    }

        if (state.isSubmitted){
            return (
                <div className = 'lobby'>
       
                <h2>GAME CODE: {state.code}</h2>
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
                
                </div>
            )
        }
        else{
            return (
                <>
                Enter Your Name: <br/> <br/>
                <input className='textBox' type="text" name='name' value={state.name} onChange={handleChange}/>
                <br/> <br/>
                Enter Lobby Code: <br/> <br/>
                <input className='textBox' type="text" name='code' value={state.code} onChange={handleChange}/>
                <br/> <br/>
                <input className='my-submit' type="submit" onClick={handleSubmit} value="Join Lobby"/>
                <br/><br/>
                <p>{state.errorCode}</p>
                </>
            )
        }

     
}

export default JoinForm

const initialValues = {
    name: '',
    isSubmitted: false,
    code: '',
    players: []
};

const infoReducer = (state, action) => {
    return {
        ...state,
        ...action
    }
}