import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import socket from './socketConfig'
import { useNavigate } from 'react-router-dom'
import {useLocation} from 'react-router-dom';

function AfterLobbyGuest() {
    const history = useNavigate();
    const location = useLocation();
    console.log(location.state.name)

    const handleJoin = (e) => {
        history(`/beforeplayingguest/${location.state.name}`)

    }

    socket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        if(data['event_type'] === 'end_lobby'){
            window.location.assign("/")
        }

    }

    const handleBet = (e) => {
        history(`/beforebetting/${location.state.name}`)
    }

    if(sessionStorage.getItem('code') != null) {

            return(
      
                <div className='after'>
                    <div>
                        <button className='everyone' type="submit" onClick={handleJoin} >JOIN GAME</button>
                    </div>
                    <div>
                    <button className='everyone' type="submit" onClick={handleBet}>BET</button> <br/><br/>
                    </div>
    
        
                </div>
            )

    }
    else{
        return(
            <Navigate to='/' />
        )
    }


}

export default AfterLobbyGuest