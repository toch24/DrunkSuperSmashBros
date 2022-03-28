import React from 'react';
import "./Home.css";

function CreateLobbyPopup(props){
    return (props.trigger) ? (
        <div className='popup'>
            <div className='cl-popup'>
                <button className='close-button' onClick={() => props.settrigger(false)}>X</button>
                {props.children}
            </div>
        </div>

    ) : "";
}


export default CreateLobbyPopup