import React from 'react'
import { FormControl, FormGroup, ControlLabel, Checkbox } from "react-bootstrap";
import { Button } from "react-bootstrap";

const StudySessionForm = (props) => {
    return (
    <form>
        <FormGroup>
            <ControlLabel>Which learning goal are you studying for?</ControlLabel>
            <FormControl onChange={props.handleGoalInputChange} value={props.category} name="category" componentClass="select" placeholder="select">
                    {props.goals.map((goal)=> {
                        <option value="">{goal.goal}</option>
                    })}
 
            </FormControl>
        </FormGroup>

        <FormGroup>
            <ControlLabel>Date</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="I want to learn"
                    name="goal"
                    onChange={props.handleGoalInputChange}
                    value={props.goal}
                />
        </FormGroup>

        <FormGroup>
            <ControlLabel>Start Time</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="I want to be able to..."
                    name="measurement"
                    onChange={props.handleGoalInputChange}
                    value={props.measurement}
                />
        </FormGroup>

        <FormGroup>
            <ControlLabel>End Time</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="date"
                    placeholder="MM/DD/YYYY"
                    name="due_date"
                    onChange={props.handleSessionInputChange}
                    value={props.due_date}
                />
        </FormGroup>

        <Button onClick={props.createSessionSubmit}>Schedule Study Session</Button>
    </form>
    );
}

export default StudySessionForm;