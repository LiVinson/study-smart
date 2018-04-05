import React from 'react';
import './GoalPanelMessage.css';
import { Panel } from 'react-bootstrap';

const GoalPanelMessage = (props) => {
    return (
        <Panel className="goalPanelMessage">
            <Panel.Body>
                {props.message}
            </Panel.Body>
        </Panel>
    );
}

export default GoalPanelMessage;