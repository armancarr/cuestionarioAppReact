import React from 'react';
import { useNavigate } from  "react-router-dom";

const NoMatch = () =>{
    const navigate = useNavigate();
    return(
        <div>
            <h1>404Page</h1>
            <p>Redirect to<span onClick={() =>navigate('/')} style={{color:'dodgerblue',paddingLeft:'10px',cursor:'pointer'}}>Login Page</span></p>
        </div>
    )
    
}

export default NoMatch;