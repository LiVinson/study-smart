import React from 'react';
import { Link } from 'react-router-dom';
import { Panel } from 'react-bootstrap';
import './GoalCard.css'
import moment from 'moment';

const GoalCard = props => {
    const date = moment(props.due_date).format("dddd, MMMM, D, YYYY");
    return (
        <Link className="goalLink" to={"/learninggoal/" + props.goalId}>
                <Panel className="goalCard">
            <Panel.Body>
                <p className="goalCardText"><b>Category: </b>{props.category}</p>
                <p className="goalCardText"><b>Goal: </b> {props.goal} </p>
                <p className="goalCardText"><b>Due Date: </b> {date}</p>

            </Panel.Body>
        </Panel>
        
        </Link>

    );
}

export default GoalCard;
