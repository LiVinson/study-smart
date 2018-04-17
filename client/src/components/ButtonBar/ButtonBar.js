import React from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import './ButtonBar.css'
import { Link } from 'react-router-dom';

const ButtonBar = props => {
    return (
        <Row className='buttonBar'>
            <Col md={3} xs={12}>
                <Link to={"/profile"}>
                    <Button block>View Study Calendar</Button>
                </Link>
            </Col>

            <Col md={3} xs={12}>
                <Button block onClick={props.showGoalModal}>Add New Learning Goal</Button>
            </Col>

            <Col md={3} xs={12}>
                <Button disabled={props.goalCreated < 1} block onClick={props.showSessionModal}>Add New Study Session</Button>

            </Col>
            <Col md={3} xs={12}>
                <Link to={"/"}>
                    <Button disabled block>Study Invite-<span className="italics">Coming soon!</span></Button>
                </Link>
            </Col>
        </Row>






    //     <div className="buttonBar">
    //     {/* <div className="welcome"><p>Welcome {props.first_name}!</p></div> */}
    
    // <ButtonGroup>
    //         <Link to={"/profile"}>
    //             <Button>View Study Calendar</Button>
    //         </Link>

    //         <Button onClick={props.showGoalModal}>Add New Learning Goal</Button>
    //         <Button onClick={props.showSessionModal}>Add New Study Session</Button>
            
    //         <Link>
    //         <Button>View Study Invites</Button>
    //         </Link>

    // </ButtonGroup>
    //     </div>
    )

};

export default ButtonBar;