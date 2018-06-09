import React from 'react';
import "./GoalPanel.css";

const GoalPanel = props => {
    return (
            <div className="goalPanel">
                {props.children}
            </div>
    );
}

export default GoalPanel;