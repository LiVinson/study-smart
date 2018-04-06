import React from "react";
import { FormControl, FormGroup, ControlLabel, Checkbox } from "react-bootstrap";
import { Button } from "react-bootstrap";
const ProfileForm = (props) => {
    return (
        <form className="profile-form">

            <FormGroup>
                <ControlLabel>Tell us a little about you!</ControlLabel>
                <FormControl.Static>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Vivamus in tristique metus. Quisque sed rutrum est, quis volutpat eros.
                     In lorem tortor, tristique eu varius sit amet, interdum sed diam. Proin 
                     viverra vehicula sem, a sollicitudin nunc dapibus sit amet. Maecenas sit 
                     amet risus non nibh convallis efficitur vitae sed sem. Nulla vitae nibh. </FormControl.Static>
            </FormGroup>

            <FormGroup>
                <ControlLabel>First Name</ControlLabel>
                <FormControl
                    type="text"
                    label="Text"
                    placeholder="Sara"
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
                    placeholder="Doe"
                    name="last_name"
                    onChange={props.handleInputChange}
                    value={props.last_name}
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Mobile Number</ControlLabel>
                <FormControl
                    id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="123-456-7890"
                    name="mobile_number"
                    onChange={props.handleInputChange}
                    value={props.mobile_number}
                />
            </FormGroup>

            <FormGroup>
                <ControlLabel>Learner Status</ControlLabel>

                <FormControl onChange={props.handleInputChange} value={props.learner_status} name="learner_status" componentClass="select" placeholder="select">
                    <option value="High School Student">High School Student</option>
                    <option value="College Student (Undergraduate)">College Student (Undergraduate)</option>
                    <option value="College Student (Graduate)">College Student (Graduate)</option>
                    <option value="Self-Improvement">Self-Improvement</option>
                    <option value="Bootcamp">Bootcamp</option>
                </FormControl>
            </FormGroup>

            {/* // <FormGroup>
            //     <ControlLabel>What subject(s) are you studying?</ControlLabel>
            //     <Checkbox>Computer Science</Checkbox>
            //     <Checkbox>Software Development</Checkbox>
            //     <Checkbox>Biology</Checkbox>
            //     <Checkbox>Chemistry</Checkbox>
            //     <Checkbox>Physics</Checkbox>
            //     <Checkbox>Anatomy</Checkbox>
            //     <Checkbox>History/Political Science</Checkbox>
            //     <Checkbox>Foriegn Language</Checkbox>
            //     <Checkbox>Social Science</Checkbox>
            //     <Checkbox>Mathematics</Checkbox>
            //     <Checkbox>Other</Checkbox>
            // </FormGroup> */}

        <Button onClick={props.createProfileSubmit}>Submit Profile</Button>
        </form>
    );
}

export default ProfileForm;