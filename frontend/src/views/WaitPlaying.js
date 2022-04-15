import React from 'react';
import "./Home.css";
import loading from "../images/808.gif";

function WaitPlaying(props){
    return (
        <div className='wait-playing'>
            <div className='wait-playing'>
                Waiting for other players to finish the challenges
            </div>
            <div>
                <img className = 'loading' src={loading} alt=" " />
            </div>
        </div>)
}


export default WaitPlaying