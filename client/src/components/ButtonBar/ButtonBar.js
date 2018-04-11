import React from 'react';
import { Button } from 'react-bootstrap';
import './ButtonBar.css'

const ButtonBar = props => {
    return (
        <div className="buttonBar">
        <div className="welcome"><p>Welcome {props.first_name}!</p></div>
    
            <Button onClick={props.viewSchedule}>View Study Schedule</Button>
            <Button onClick={props.showGoalModal}>Add New Learning Goal</Button>
            <Button onClick={props.showSessionModal}>Add New Study Session</Button>
            <Button onClick={props.viewStudyInvites}>View Study Invites</Button>
        </div>
    )

};

export default ButtonBar;