import React from 'react';
import {useLocation} from 'react-router-dom'

function ChallengeHost(){
    const location = useLocation();

    return(
        <>
        
        <div className='challenge'>
            <h3>{location.state.challenge}</h3>
        </div>

        <div>
        <button className='end' type="submit"> GAME DONE! </button> 
        </div>
        </>
    )
}


export default ChallengeHost