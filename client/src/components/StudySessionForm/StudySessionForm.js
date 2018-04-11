import React from 'react'
import { FormControl, FormGroup, ControlLabel, Checkbox } from "react-bootstrap";
import { Button } from "react-bootstrap";

const StudySessionForm = (props) => {
    return (
    <form>
        <FormGroup>
            <ControlLabel>Which learning goal are you studying for?</ControlLabel>
            <FormControl onChange={props.handleSessionInputChange} name="goalId" componentClass="select" placeholder="select">
                  {props.goals.map(goal=> (
                      <option key ={goal._id} value={goal._id}>{goal.category}</option>

                  ))}               
            </FormControl>
        </FormGroup>

         <FormGroup>
            <ControlLabel>Start Date &amp; Time</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="I want to learn"
                    name="start"
                    onChange={props.handleSessionInputChange}
                    value={props.start}
                />
        </FormGroup>

        <FormGroup>
            <ControlLabel>End Date &amp; Time</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="I want to be able to..."
                    name="end"
                    onChange={props.handleSessionInputChange}
                    value={props.end}
                />
        </FormGroup>

        <FormGroup>
            <ControlLabel>What topics will you be studying?</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="example: data types, array methods"
                    name="topic"
                    onChange={props.handleSessionInputChange}
                    value={props.topic}
                />
        </FormGroup>
        <FormGroup>
            
            <ControlLabel>Where will you be studying?</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="Enter 'Home', 'School' or an address"
                    name="location"
                    onChange={props.handleSessionInputChange}
                    value={props.location}
                />
        </FormGroup>

        
        <Button onClick={props.createSessionSubmit}>Schedule Study Session</Button>
    </form>
    );
}

export default StudySessionForm;