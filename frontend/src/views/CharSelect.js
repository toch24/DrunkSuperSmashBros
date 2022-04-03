import React, {useEffect, useState} from 'react';
import { get_char_data } from '../Utilities/FetchFunction';



function CharSelect(){
    const [ characters, setCharacters ] = useState([])

    useEffect(() => {
        get_char_data()
        .then(res => {
            setCharacters(res)
        })
    
    }, []);

    const handleClick = (e) => {
        localStorage.setItem('char', e.target.name)
    }


    return(
        <div className = "char-list">
        <div className="scroller">
        <h2>SELECT A CHARACTER:</h2>
        { Object.entries(characters).map(([key, val]) =>
          <div className="chars">
           <a href="#"> <img name={key} key={key} onClick ={handleClick}className='char-image' src={val} alt=''/> </a>
          <p><a className = "item" name={key} key={key} onClick ={handleClick} href="#">{key}</a></p>
  
          </div>
         )}
        </div>
        </div>

    )

}

export default CharSelect
