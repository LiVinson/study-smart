import React from 'react';
import { Modal } from 'react-bootstrap';
import { Tabs, Tab } from 'react-bootstrap';
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";
// import StudyBuddyForm from '.././StudyBuddyForm';
import './SessionTabModal.css'


const SessionTabModal = props => {

    //Takes in goals array from props.profile.goals passed from LearningGoalPage. Uses find method to search each element in goals array
    //and return the one with an ID that matches the id passed in as props.selected Session from LearningGoalPage component. 
    //Used to list the name and description of goal that session belongs to in the modal when displaying session details
    
    const associatedGoal = (props.goals).find(goal => { return goal._id === (props.selectedSession.goalId) });

    //Takes in the array passed in as props.selectedSession.resources from Profile page. Contains 1 element per resource entered
    //ACTION - Add steps to limit number of arrays and update how they are displayed (10? - Showing 1-5, 6-10?)
    //Add ability to delete a resource 

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
                            <h2 className="sessionDetailHeader">View &amp; Add Resources</h2>

                            <form>
                                <FormGroup>
                                    <ControlLabel>Add Resouces</ControlLabel>
                                    <FormControl.Static>
                                        Add the name, URL, and/or description for resources you want to be sure to cover during this study session.
                                    </FormControl.Static>
                                </FormGroup>

                                <FormGroup>
                                    <ControlLabel>Description of Resource</ControlLabel>
                                    <FormControl
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

                                {resourcesArr.length ? ( //Resources that wre already displayed are pased down in Arr and displayed in modal                        
                                    (props.selectedSession.resources).map(resource => (
                                        <div key={resource._id} className="resourceDiv">
                                            
                                                <p>{resource.description}</p>
                                                <a href={resource.url} target="_blank"><p>{resource.url}</p></a>
                                            
                                            {/*ACTION - Add delete button with confirmation. Update database with "Active" field that is turned off on delete
                                            Add filter for resources from database where active is true.*/}
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
                        <p className="comingSoonNote"><b>Coming Soon!</b> Invite your friends and form group study sessions!</p>
                        {/* {(props.selectedSession.sessionOwnerId === props.auth.userId) ? (
                            <StudyBuddyForm 
                                studyBuddyEmail={props.selectedSession.newStudyBuddyInfo.email} 
                                studyBuddyEmailMsg={props.selectedSession.newStudyBuddyInfo.studyBuddyEmailMsg}
                                handleStudyBuddyInputChange={props.handleStudyBuddyInputChange}
                                handleStudyBuddySubmit={props.handleStudyBuddySubmit}
                                selectedSession={props.selectedSession} */}
                            {/* />
                             props.selectedSession.invitees.length ? (
                                 <div>You have invited some study buddies. Their names and acceptance status will show here</div>
                             ) : (<div>You haven't invited anyone to study with yet...</div>)
                        // ) : (<div>You are not the owner of this event. You will not be able to invite others or view pending invites, but you can see accepted users who have accepted.</div>)} */}
                    </Tab>

                </Tabs>
            </Modal.Body>

            <Modal.Footer>
                {/* {(props.selectedSession.owner === props.auth.userId) ? (<Button>Edit Study Session</Button>) : (null)} */}
                <Button className="sessionDetailBtn" onClick={props.hideSessionDetails}>Close</Button>
                <Button className="sessionDetailBtn delete" onClick={props.deleteEvent}>Delete Study Session</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SessionTabModal;

