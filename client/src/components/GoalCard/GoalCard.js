import React from 'react';
import { Panel } from 'react-bootstrap';
import './GoalCard.css'
const GoalCard = (props) => {
    return (
        <Panel className="goalCard">
            <Panel.Body>
                <p><b>Category:</b>{props.category}</p>
                <p><b>Goal:</b> {props.goal} </p>
                <p><b>Due Date:</b> {props.due_date}</p>

            </Panel.Body>
        </Panel>
    );
}

export default GoalCard;
