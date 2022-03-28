import React from 'react';
import LobbyPopup from './LobbyPopup';
import CreateLobbyForm from './CreateLobbyForm';
import { useState } from 'react';
import test from '../../images/Test.jpg';
import "./Home.css";
import JoinForm from './JoinForm';

console.log(test);
function Home(){
    const [lobbyPopup, setLobbyPopup] = useState(false);
    const [joinPopup, setJoinPopup] = useState(false);
    return(
        <>
        <h1 className='header'>DRUNK SUPER SMASH BROS</h1>
        <div className="card">
            <div className='home-img'> 
                <img className='my-img' src={test} alt='Test'/>
            </div>

            <div className='lobby-buttons'>
                <button onClick={() => setLobbyPopup(true)} className='my-button'>Create lobby</button>
                <button onClick={() => setJoinPopup(true)} className='my-button'>Join</button>
            </div>

            <LobbyPopup trigger={lobbyPopup} settrigger={setLobbyPopup}>
                <CreateLobbyForm/>
            </LobbyPopup>

            <LobbyPopup trigger={joinPopup} settrigger={setJoinPopup}>
                <JoinForm/>
            </LobbyPopup>
        </div>
        </>

    )
}


export default Home