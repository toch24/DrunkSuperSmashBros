import React, {useState} from 'react';
import { Navigate } from 'react-router-dom';
import TextPopup from './TextPopup'


function WaitingRoomHost () {
    const [custom, setCustom] = useState(false);
    const [challenge, setChallenge] = useState('');

    const submitNew = (e) => {
       
    }

    const submitCustom = (e) => {
       console.log(challenge)
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