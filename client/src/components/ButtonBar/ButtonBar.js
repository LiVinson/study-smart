import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonBar = () => {
    return (
        <div className="buttonBar">
            <Button>View Study Schedule</Button>
            <Button>Add New Learning Goal</Button>
            <Button>Add New Study Session</Button>
            <Button>View Study Invites</Button>
        </div>
    )

};

export default ButtonBar;