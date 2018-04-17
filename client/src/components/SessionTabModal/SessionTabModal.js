import React from 'react';
import { Modal } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { FormControl, FormGroup, ControlLabel, Button, HelpBlock } from "react-bootstrap";
import StudyBuddyForm from '.././StudyBuddyForm';
import './SessionTabModal.css'


const SessionTabModal = props => {

    const associatedGoal = (props.goals).find(goal => { return goal._id === (props.selectedSession.goalId) });
    const resourcesArr = (props.selectedSession.resources).filter(resource => {return resource.show === true});

    return (
        <Modal show={props.show}>
            <Modal.Body className="modal-body">
                <Tabs defaultActiveKey={1} animation={true} id="studySessionDetails">
                    <Tab eventKey={1} title="Study Session">
                        <div>
                            <h2 className="sessionDetailHeader">Study Session Details</h2>
                            {associatedGoal ? (<span>
                                <p><b>Goal Category:</b> {associatedGoal.category}</p>
                                 <p><b>Associated Goal:</b> {associatedGoal.goal}</p></span>) : (null)}
                            <p><b>Study Session Topics:</b> {props.selectedSession.title}</p>
                            <p><b>Start Date and Time:</b> {props.selectedSession.start}</p>
                            <p><b>End Date and Time:</b> {props.selectedSession.end}</p>
                            <p><b>Location:</b> {props.selectedSession.location}</p>


                        </div>
                    </Tab>
                    <Tab eventKey={2} title="Resources">
                        <div>
                            <h2 className="sessionDetailHeader">Add Resources</h2>

                            <form>
                                <FormGroup>
                                    <ControlLabel>Add Resouces</ControlLabel>
                                    <FormControl.Static>
                                        Add the name, URL, and or description for resources you want to be sure to cover during this study session
                                    </FormControl.Static>
                                </FormGroup>

                                <FormGroup>
                                    <ControlLabel>Description of Resource</ControlLabel>
                                    <FormControl
                                            // id="formControlsText"
                                            type="text"
                                            placeholder="JavaScript Inheritance and the prototype chain"
                                            name="description"
                                            onChange={props.handleResourceInputChange}
                                            value={props.description}
                                        />
                                </FormGroup>

                                <FormGroup>
                                    <ControlLabel>Resource URL</ControlLabel>
                                    <FormControl
                                            // id="formControlsText"
                                            type="text"
                                            placeholder="https://developer.mozilla.org"
                                            name="url"
                                            onChange={props.handleResourceInputChange}
                                            value={props.url}
                                        />
                                </FormGroup>
                                <Button className="resourceBtn" onClick={props.handleResourceSubmit}>Add New Resource</Button>
                                {/* On click, save resource into database for this event  */}
                            </form>
                            
                            <div>
                                <b><h4 className="centerHeader">Saved Resources</h4></b>

                                {resourcesArr.length ? (                         
                                    (props.selectedSession.resources).map(resource => (
                                        <div key={resource._id} className="resourceDiv">
                                            
                                                <p>{resource.description}</p>
                                                <a href={resource.url} target="_blank"><p>{resource.url}</p></a>
                                            
                                            {/* <Button> 
                                            {/* // onClick={props.removeResource(props.selectedSession._id, resource._id)}> */}
                                                {/* Remove Resource
                                            </Button> */} 
                                        </div>
                                        )
                                    )) : (<div>No Resources Currently Saved</div>)} 
                            </div>

                        </div>


                    </Tab>

                    <Tab eventKey={3} title="Study Buddies">
                        <h2 className="sessionDetailHeader">Study Buddies</h2>
                        {(props.selectedSession.owner === props.auth.userId) ? (
                            <StudyBuddyForm 
                                study_buddy={props.study_buddy} 
                                handleStudyBuddyInputChange={props.handleStudyBuddyInputChange}
                                handleStudyBuddySubmit={props.handleStudyBuddySubmit}
                                selectedSession={props.selectedSession}
                            />
                            // props.selectedSession.invitees.length ? (
                            //     <div>You have invited some study buddies. Their names and acceptance status will show here</div>
                            // ) : (<div>You haven't invited anyone to study with yet...</div>)
                        ) : (<div>You are not the owner of this event. You will only be able to see the accepted users</div>)}
                    </Tab>

                </Tabs>
            </Modal.Body>

            <Modal.Footer>
                {/* {(props.selectedSession.owner === props.auth.userId) ? (<Button>Edit Study Session</Button>) : (null)} */}
                <Button className="sessionDetailBtn" onClick={props.hideSessionDetails}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SessionTabModal;

