import React from 'react';
import {useLocation} from 'react-router-dom'

function ChallengeGuest(){
    const location = useLocation();

    return(
        <>
        
        <div className='challenge'>
           <h4> {location.state.challenge} </h4>
        </div>
        </>
    )
}


export default ChallengeGuest