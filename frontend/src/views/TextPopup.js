import React from 'react';
import "./Home.css";

function TextPopup(props){
    return (props.trigger) ? (
        <div className='popup'>
            <div className='text-popup'>
                <button className='close-button' onClick={() => props.settrigger(false)}>X</button>
                {props.children}
            </div>
        </div>

    ) : "";
}


export default TextPopup