import React from 'react';
import CreateLobbyPopup from './CreateLobbyPopup';
import { useState } from 'react';
import test from '../../images/Test.jpg';
import "./Home.css";

console.log(test);
function Home(){
    const [lobbyPopup, setLobbyPopup] = useState(false);
    return(
        <>
        <h1 className='header'>DRUNK SUPER SMASH BROS</h1>
        <div className="card">
            <div className='home-img'> 
                <img className='my-img' src={test} alt='Test'/>
            </div>

            <div className='lobby-buttons'>
                <button onClick={() => setLobbyPopup(true)} className='my-button'>Create lobby</button>
                <button className='my-button'>Join</button>
            </div>
            <CreateLobbyPopup trigger={lobbyPopup} settrigger={setLobbyPopup}>
                <p>Test</p>
            </CreateLobbyPopup>
        </div>
        </>

    )
}


export default Home