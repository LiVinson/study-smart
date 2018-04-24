import React from "react";
import { FormControl, FormGroup, ControlLabel, HelpBlock } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./ProfileForm.css";

const ProfileForm = (props) => {
    return (
        <form className="profile-form">

            <FormGroup>
                <ControlLabel>Tell us a little about you!</ControlLabel>
                <FormControl.Static>
                    Tell us a little about you and what brings you to Study SMART. 
                    Don't worry, your last name or phone number are not visible to other users and won't be shared. 
                </FormControl.Static>
            </FormGroup>

            <FormGroup>    

                <ControlLabel>First Name</ControlLabel>

                <FormControl
                    type="text"
                    label="Text"
                    placeholder="First Name"
                    name="first_name"
                    onChange={props.handleInputChange}
                    value={props.first_name}
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
                    value={props.last_name}
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
                    value={props.mobile_number}
                />
                <HelpBlock className="comingSoon"><b>Coming Soon!</b> Choose if you would like to receive reminder texts for upcoming study sessions!</HelpBlock>
            </FormGroup>

            <FormGroup>
                <ControlLabel>Learner Status</ControlLabel>

                <FormControl onChange={props.handleInputChange} value={props.learner_status} name="learner_status" componentClass="select" placeholder="select">
                    <option value="High School Student">High School Student</option>
                    <option value="College Student (Undergraduate)">College Student (Undergraduate)</option>
                    <option value="College Student (Graduate)">College Student (Graduate)</option>
                    <option value="Self-Improvement">Self-Improvement/For Fun</option>
                    <option value="Bootcamp">Bootcamp</option>
                </FormControl>
            </FormGroup>
        <div className="createProfileBtnContainer">
            <Button className="createProfileBtn" onClick={props.createProfileSubmit}>Submit Your Profile!</Button>
        </div>
        </form>
    );
}

export default ProfileForm;