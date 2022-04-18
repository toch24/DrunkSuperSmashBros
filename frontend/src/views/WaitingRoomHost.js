import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import socket from './socketConfig';
import TextPopup from './TextPopup';
import loading from '../images/808.gif'



function WaitingRoomHost () {
    const [custom, setCustom] = useState(false);
    const [challenge, setChallenge] = useState('');
    const [canPickChallenge, setcanPickChallenge] = useState(false);

    const submitNew = (e) => {
       
    }

    const submitCustom = (e) => {
       console.log(challenge)
    }

    socket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        console.log(data)
        if(data['event_type'] === 'all_chars_chosen'){
            let canPick = JSON.parse(data['message'])
            if(canPick){
               setcanPickChallenge(true)
            }
        }
    }

    if(!canPickChallenge){
        return(
            <div className='after'>
            <div>
                <img className = 'loading' src={loading} alt="loading bar" />
            </div>
            
            <h2>Waiting for players to pick their characters</h2>
            </div>
        )
    }
    else if(localStorage.getItem('code') != null && canPickChallenge) {
        return(
            <div className='after'> 
            <div>
                <button className="everyone" type="submit" onClick={submitNew} >NEW CHALLENGE</button>
            </div>
            <div>
                <button className="everyone" onClick={() => setCustom(true)} >CUSTOM CHALLENGE</button>
            </div>
            
            <TextPopup trigger={custom} settrigger={setCustom}>
                <> 
                <div className='cl-form'>
                <input className="custom" type="text" placeholder='Type Challenge' onChange={(e) => setChallenge(e.target.value)}></input>
                </div>
                <button className= 'my-submit' type="submit" onClick={submitCustom}>DONE!</button>
                </>
            </TextPopup>

            </div>
        )
    }
    else{
        return(
            <Navigate to = '/' />
        )
    }
}

export default WaitingRoomHost