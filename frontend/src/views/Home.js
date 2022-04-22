import React from 'react';
import LobbyPopup from './LobbyPopup';
import CreateLobbyForm from './CreateLobbyForm';
import { useState } from 'react';
import smash from '../images/Smash_Logo.png'
import "./Home.css";
import JoinForm from './JoinForm';


function Home(){
    const [lobbyPopup, setLobbyPopup] = useState(false);
    const [joinPopup, setJoinPopup] = useState(false);
    sessionStorage.clear()

    return(
        <>

            <img className='my-img' src={smash} alt=''/>
        

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
    
        </>

    )
}


export default Home