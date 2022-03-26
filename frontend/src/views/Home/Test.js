import React from 'react';
import { get_test } from '../../Utilities/FetchFunction';

function Test(){
    
    const handleChange = (event) =>{
        console.log(get_test())
    }
    
    return(
        <>
                <button onClick={handleChange}> Call axios </button>
        </>

    )
}


export default Test