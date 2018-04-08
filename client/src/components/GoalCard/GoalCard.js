import React from 'react';
import { Panel } from 'react-bootstrap';

const GoalCard = (props) => {
    return (
        <Panel className="goalCard">
            <Panel.Body>
                {props.children}
            </Panel.Body>
        </Panel>
    );
}

export default GoalCard;
