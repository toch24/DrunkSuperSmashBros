import React, {useState} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import socket from './socketConfig';
import TextPopup from './TextPopup'


function WaitingRoomHost () {
    const [custom, setCustom] = useState(false);
    const [challenge, setChallenge] = useState('');
    const history = useNavigate()

    const submitNew = (e) => {
       socket.send("new_challenge")
       socket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        if(data['event_type'] === 'new_challenge') // this is called after a winner is provided
            console.log(data['message'])
            setChallenge(data['message'])
            socket.send('challenge,'+data['message']+',')

            //not sure why using state challenge it wont pass the challenge
            history('/challenge', {state:{challenge: data['message']}})
        
        
    }
    }

    const submitCustom = (e) => {
        socket.send('challenge,'+challenge+',')
        history('/challenge', {state:{challenge: challenge}})
    }

    if(localStorage.getItem('code') != null) {
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