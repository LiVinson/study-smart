import React from 'react';
import { FormControl, FormGroup, ControlLabel, HelpBlock, Button } from "react-bootstrap";
import './StudyBuddyForm.css';

const StudyBuddyForm = props => {
    return (
        <form>
            <FormGroup>
            <ControlLabel>Enter the email address for the study buddy you would like to invite to your {props.selectedSession.title} study session.</ControlLabel>
            <FormControl
                    type="text"
                    label="Text"
                    placeholder="user@email.com"
                    name="email"
                    onChange={props.handleStudyBuddyInputChange}
                    value={props.studyBuddyEmail}
                />
                <HelpBlock>{props.studyBuddyEmailMsg}</HelpBlock>
               

            </FormGroup>

            <Button onClick={props.handleStudyBuddySubmit}>Send Invite</Button>
        </form>
    )
};

export default StudyBuddyForm;
