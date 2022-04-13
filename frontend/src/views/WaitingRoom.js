import React, {useEffect, useState} from 'react';
import { Navigate } from 'react-router-dom';


function WaitingRoom () {
    if(localStorage.getItem('host')) {
        return(
            <> 
            <h1>here</h1>
            </>
        )
    }
    else{
        return(
            <>
            <h1>not here</h1>
            </>
        )
    }
}

export default WaitingRoom