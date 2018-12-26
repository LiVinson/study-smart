import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import './ButtonBar.css'
import { Link } from 'react-router-dom';

const ButtonBar = props => {
    return (
        <Row className='buttonBar'>
            <Col sm={3} xs={12}>
                <Link to={"/profile"}>
                    <Button className="buttonBarBtn" block>View Study Calendar</Button>
                </Link>
            </Col>

            <Col sm={3} xs={12}>
                <Button className="buttonBarBtn" block onClick={props.showGoalModal}>Add New Learning Goal</Button>
            </Col>

            <Col sm={3} xs={12}>
                <Button className="buttonBarBtn" disabled={props.goalCreated < 1} block onClick={props.showSessionModal}>Add New Study Session</Button>

            </Col>
            <Col className="btnBarCol4" sm={3} xs={12}>
                <Link to={"/"}>
                    <Button className="buttonBarBtn" disabled block>View Study Invites - <span className="italics">Coming soon!</span></Button>
                </Link>
            </Col>
        </Row>
    )

};

export default ButtonBar;