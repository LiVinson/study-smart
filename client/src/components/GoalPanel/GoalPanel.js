import React from 'react';
import "./GoalPanel.css";
import { Button } from 'react-bootstrap';

const GoalPanel = (props) => {
    return (
        <div className="goalPanel">
        <Button onClick={props.showGoalForm}>Add a New Goal</Button>
        {props.children}
        </div>
    );
}

export default GoalPanel;