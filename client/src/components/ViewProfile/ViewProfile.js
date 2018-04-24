import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Button } from 'react-bootstrap';
const ViewProfile = props => {
    return (
        <div>
            {props.viewProfile ? (
                <div>
                    <div>
                        <p>First Name: {props.profile.first_name}</p>
                        <p>Last Name: {props.profile.last_name}</p>
                        <p>Mobile Number: {props.profile.mobile_number}</p>
                        <p>Learner Status: {props.profile.learner_status}</p>
                    </div>
                    <div>
                        <Button onClick={props.editProfileForm}>Edit Profile</Button>
                        <Button onClick={props.toggleProfileModal}>Close Profile</Button>
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
                        <div>
                            <Button onClick={props.saveProfileEdit}>Save Changes</Button>
                            <Button onClick={props.toggleProfileModal}>Cancel</Button>
                        </div>
                    </form>

                )}
        </div>
    );
}

export default ViewProfile;