import loading from '../images/808.gif'
import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import socket from './socketConfig';


function WaitingRoomGuest () {
    const[ challenge, setChallenge ] = useState('')
    const history = useNavigate()

    useEffect(() => {
        socket.onmessage = (e) => {
            let data = JSON.parse(e.data)
            if(data['event_type'] === 'challenge') 
                setChallenge(data['message'])
                history('/challengeguest', {state:{challenge: data['message']}})
            
        }
    
    }, []);

    if(localStorage.getItem('code') != null) {
        return(
            <div className='after'>
            <div>
                <img className = 'loading' src={loading} alt=" " />
            </div>
            
            <h2>Waiting for host to start challenge</h2>
            </div>
        )
    }
    else{
        return(
            <Navigate to = '/' />
        )
    }
}

export default WaitingRoomGuest