import React from 'react';
import { useNavigate } from 'react-router-dom';
import socket from './socketConfig';
import Win from '../images/Win.gif'

function BetWin () {
    let history = useNavigate()

    socket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        if(data['event_type'] === 'end_lobby'){
            window.location.assign("/")
        }

    }

    //localstorage will not work as intended if the game is being played in the same browser
    const handleBack = (e)  => {
        e.preventDefault();
        socket.send('reset,'+sessionStorage.getItem('name')+',')
        history('/afterlobbyguest', {
            state: {
                name: sessionStorage.getItem('name')
            }
        });
    }

    return(
        <>
        
            <div className='bet-win'>
                You won the bet!
            </div>
            
            <div>
                    <img className = 'bet-lose-img' src={Win} alt=" " />
            </div>

            <div>
                <button className='everyone' type="submit" onClick={handleBack} >Back to Lobby</button>
            </div>
        </>
        )
}

export default BetWin