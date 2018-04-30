import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
import './ViewProfile.css';

const ViewProfile = props => {
    return (
        <div>
            {props.viewProfile ? (
                <div className="viewProfileDiv">
                    <div>
                        <p className="profileText"><span>First Name: </span>{props.profile.first_name}</p>
                        <p className="profileText"><span>Last Name: </span>{props.profile.last_name}</p>
                        <p className="profileText"><span>Mobile Number: </span>{props.profile.mobile_number}</p>
                        <p className="profileText"><span>Learner Status: </span>{props.profile.learner_status}</p>
                        <p className="profileText"><span>Number of Learning Goals: </span>{props.profile.goals.length}</p>
                        <p className="profileText"><span>Number of Study Sessions: </span>{props.profile.sessions.length}</p>

                    </div>
                    <div className='viewProfileBtnContainer'>
                        <Button className="editProfileBtn" onClick={props.editProfileForm}>Edit Profile</Button>
                        <Button className="cancelViewProfile" onClick={props.toggleProfileModal}>Close</Button>
                    </div>
                </div>
            ) : (
                    <form>
                        <FormGroup>
                            <ControlLabel>First Name</ControlLabel>
                            <FormControl
                                type="text"
                                label="Text"
                                placeholder="First Name"
                                name="first_name"
                                onChange={props.handleInputChange}
                                value={props.editProfile.first_name}
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Last Name</ControlLabel>
                            <FormControl
                                id="formControlsText"
                                type="text"
                                label="Text"
                                placeholder="Last Name"
                                name="last_name"
                                onChange={props.handleInputChange}
                                value={props.editProfile.last_name}
                            />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Mobile Number (US Only) - Optional</ControlLabel>
                            <FormControl
                                id="formControlsText"
                                type="text"
                                label="Text"
                                placeholder="123-456-7890"
                                name="mobile_number"
                                onChange={props.handleInputChange}
                                value={props.editProfile.mobile_number}
                            />
                            <HelpBlock className="comingSoon"><b>Coming Soon!</b> Choose if you would like to receive reminder texts for upcoming study sessions!</HelpBlock>
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>Learner Status</ControlLabel>

                            <FormControl onChange={props.handleInputChange} value={props.editProfile.learner_status} name="learner_status" componentClass="select" placeholder="select">
                                <option value="High School Student">High School Student</option>
                                <option value="College Student (Undergraduate)">College Student (Undergraduate)</option>
                                <option value="College Student (Graduate)">College Student (Graduate)</option>
                                <option value="Self-Improvement">Self-Improvement/For Fun</option>
                                <option value="Bootcamp">Bootcamp</option>
                            </FormControl>
                        </FormGroup>
                        <div className='viewProfileBtnContainer'>
                            <Button className="editProfileBtn" onClick={props.saveProfileEdit}>Save Changes</Button>
                            <Button className="cancelViewProfile" onClick={props.toggleProfileModal}>Cancel</Button>
                        </div>
                    </form>

                )}
        </div>
    );
}

export default ViewProfile;