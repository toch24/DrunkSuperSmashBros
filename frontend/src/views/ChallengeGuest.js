import React from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import socket from './socketConfig';

function ChallengeGuest(){
    const location = useLocation();    
    const history = useNavigate();


    socket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        console.log(data)
        if(data['event_type'] === 'player_won')
        socket.send('reset,'+sessionStorage.getItem('name')+',')
            history('/afterlobbyguest', {
                state: {
                    name: sessionStorage.getItem('name')
                }
            })
    }

    return(
        <>
        
        <div className='challenge'>
           <h4> {location.state.challenge} </h4>
        </div>
        </>
    )
}


export default ChallengeGuest