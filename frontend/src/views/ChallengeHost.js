import React from 'react';
import {useLocation} from 'react-router-dom'

function ChallengeHost(){
    const location = useLocation();

    return(
        <>
        
        <div className='challenge'>
            <h4>{location.state.challenge}</h4>
        </div>

        <div className="game-done">
        <button className='end' type="submit"> GAME DONE! </button> 
        </div>
        </>
    )
}


export default ChallengeHost