import React from 'react';
import './ErrorMsgText.css';

const ErrorMsgText = props => {

    return (
        <div className="errorMsgText">  
            <span  className={props.children === "" ? ("hideErrText") : (null)}>{props.children}.</span>
        </div> 
    )
}

export default ErrorMsgText;