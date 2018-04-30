import React from 'react';
import "./GoalPanel.css";
// import ScrollArea from 'react-scrollbar';

const GoalPanel = props => {
    console.log("goal panel has been rendered");
    return (
            
            <div className="goalPanel">
                {props.children}
            </div>

           
    );
}

export default GoalPanel;