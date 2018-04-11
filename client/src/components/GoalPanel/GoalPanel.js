import React from 'react';
import "./GoalPanel.css";
import { Button } from 'react-bootstrap';

const GoalPanel = (props) => {
    return (
        <div className="goalPanel">
        {props.children}
        </div>
    );
}

export default GoalPanel;