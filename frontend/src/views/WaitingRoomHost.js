import React, {useState, useEffect} from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import socket from './socketConfig';
import TextPopup from './TextPopup'
import loading from '../images/808.gif'


function WaitingRoomHost () {
    const [custom, setCustom] = useState(false);
    const [challenge, setChallenge] = useState('');
    const [canPickChallenge, setcanPickChallenge] = useState(false);

    const history = useNavigate()

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

    const submitNew = (e) => {
       socket.send("new_challenge")
       socket.onmessage = (e) => {
        let data = JSON.parse(e.data)
        if(data['event_type'] === 'new_challenge'){
            console.log(data['message'])
            setChallenge(data['message'])
            socket.send('challenge,'+data['message']+',')

            //not sure why using state challenge it wont pass the challenge
            history('/challengehost', {state:{challenge: data['message']}})
        }
        }
    }

    const submitCustom = (e) => {
        socket.send('challenge,'+challenge+',')
        history('/challengehost', {state:{challenge: challenge}})
    }



    if(!canPickChallenge){
        return(
            <>
            
            <div className='after'>
            <div>
                Waiting for players to select their characters
            </div>
            </div>
            <div className='img-loading'>
                <img className = 'loading' src={loading} alt=" " />
            </div>
            
            </>

        )
    }
    else if(sessionStorage.getItem('code') != null && canPickChallenge) {
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