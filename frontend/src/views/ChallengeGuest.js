import React from 'react';
import {useLocation} from 'react-router-dom'

function ChallengeGuest(){
    const location = useLocation();

    return(
        <div className='challenge'>
            <h3>{location.state.challenge}</h3>
        </div>
    )
}


export default ChallengeGuest