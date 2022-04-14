import React from 'react';
import "./Home.css";

function WaitPopup(props){
    return (props.trigger) ? (
        <div className='popup'>
            <div className='text-popup'>
                {props.children}
            </div>
        </div>

    ) : "";
}


export default WaitPopup