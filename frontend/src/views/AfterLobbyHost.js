import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';
import socket from './socketConfig'
import { useNavigate } from 'react-router-dom'
import {useLocation} from 'react-router-dom';

function AfterLobbyHost() {

    const history = useNavigate();
    const location = useLocation();
    console.log(location.state.name)

    const handleJoin = (e) => {
        history('/selectcharshost')
    }

    const handleEnd = (e) => {
        socket.send('end_lobby,')
        window.location.assign("/")
    }

    const handleBet = (e) => {
        history(`/beforebetting/${location.state.name}`)
    }

    if(localStorage.getItem('code') != null) {

            return(
      
                <div className='after'>
                    <div>
                        <button className='everyone' type="submit" onClick={handleJoin} >JOIN GAME</button>
                    </div>
                    <div>
                    <button className='everyone' type="submit" onClick={handleBet}>BET</button> <br/><br/>
                    </div>
    
                    <div>
                    <button className='end' type="submit" onClick={handleEnd} >END LOBBY</button>
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

export default AfterLobbyHost