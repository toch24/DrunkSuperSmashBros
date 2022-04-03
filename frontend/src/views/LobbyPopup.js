import React from 'react';
import "./Home.css";

function LobbyPopup(props){
    return (props.trigger) ? (
        <div className='popup'>
            <div className='lobby-popup'>
                <button className='close-button' onClick={() => props.settrigger(false)}>X</button>
                {props.children}
            </div>
        </div>

    ) : "";
}


export default LobbyPopup