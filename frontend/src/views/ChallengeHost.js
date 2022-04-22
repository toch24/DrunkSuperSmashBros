import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { get_player_data } from '../Utilities/FetchFunction';
import socket from './socketConfig';

function ChallengeHost(){
    const location = useLocation();
    const [gameDone, setGameDone] = useState(false);
    const [players, setPlayers] = useState([])
    let history = useNavigate()
    
    useEffect(() => {
        get_player_data(sessionStorage.getItem('code'))
        .then(res => {
            setPlayers(res)
        })
    }, []);

    const handleDone = (e) => {
        setGameDone(true)
    }

    function handleClick(key){
        socket.send('player_won,'+key)
        socket.send('reset,'+sessionStorage.getItem('name')+',')
        history('/afterlobbyhost', {
            state: {
                name: sessionStorage.getItem('name')
            }
        });
    }

    if(!gameDone){
        return(
            <>
            <div className='challenge'>
                <h4>{location.state.challenge}</h4>
            </div>

            <div className="game-done">
            <button className='end' type="submit" onClick={handleDone}> GAME DONE! </button> 
            </div>
            </>
        )
    }
    else if(gameDone){
        return(
            <div>
                <div className='challenge'>
                    <h4>{location.state.challenge}</h4>
                </div>

                <div className = "char-list">
                    <div className="scroller">
                        <h2>SELECT A CHARACTER:</h2>
                        { Object.entries(players).map(([key, val]) =>
                            <div className="chars" name={key} onClick={e => handleClick(key)}>
                                <div name={key}>{key} {val}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}


export default ChallengeHost