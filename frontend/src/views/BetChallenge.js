import React from 'react';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import betlose from '../images/BetLose.gif'
import { get_rand_challenge } from '../Utilities/FetchFunction';
import socket from './socketConfig';

function BetChallenge () {
    const [ challenges, setChallenges ] = useState("")
    let history = useNavigate()

    useEffect(() => {
        get_rand_challenge()
        .then(res => {
            setChallenges(res)
        })

    
    }, "");

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

    return( <div>
                <div className='bet-lose'>
                    You lose! <br/>
                    Challenge for you: <br/>
                    {challenges}
                </div>
                <div>
                    <img className = 'bet-lose-img' src={betlose} alt=" " />
                </div>
                <div>
                    <button className='everyone' type="submit" onClick={handleBack} >Back to Lobby</button>
                </div>
            </div>
            
        )
}

export default BetChallenge