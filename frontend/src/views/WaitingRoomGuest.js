import React from 'react';
import { Navigate } from 'react-router-dom';
import loading from '../images/808.gif'

function WaitingRoomGuest () {

    if(localStorage.getItem('code') != null) {
        return(
            <div className='after'>
            <div>
                <img className = 'loading' src={loading} alt=" " />
            </div>
            
            <h2>Waiting</h2>
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