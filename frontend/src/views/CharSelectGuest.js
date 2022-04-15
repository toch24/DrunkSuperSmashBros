import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { get_char_data } from '../Utilities/FetchFunction';
import socket from './socketConfig';

function CharSelectGuest(){
    const [ characters, setCharacters ] = useState([])
    let history = useNavigate()

    useEffect(() => {
        get_char_data()
        .then(res => {
            setCharacters(res)
        })

    
    }, []);

    const handleClick = (event) => {
        event.preventDefault()
        localStorage.setItem('char', event.target.name)
        history('/waitingroomguest')


    }


    return(
        <div className = "char-list">
        <div className="scroller">
        <h2>SELECT A CHARACTER:</h2>
        { Object.entries(characters).map(([key, val]) =>
          <div className="chars">
           <a href="#" onClick ={handleClick} > <img name={key} key={key} className='char-image' src={val} alt=''/> </a>
          <p><a className = "item" name={key} key={key} onClick ={handleClick} href="#">{key}</a></p>
          </div>
         )}
        </div>
        </div>

    )

}

export default CharSelectGuest
