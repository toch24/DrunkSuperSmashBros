import React from 'react';
import { Navigate } from 'react-router-dom';
import loading from '../images/808.gif'
import socket from './socketConfig';

function BetWin () {

    socket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        if(data['event_type'] === 'end_lobby'){
            window.location.assign("/")
        }

    }

    return(
            <div className='bet-win'>
                You won the bet!
            </div>
        )
}

export default BetWin