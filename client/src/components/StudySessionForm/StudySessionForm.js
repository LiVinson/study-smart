import React from 'react'
import { FormControl, FormGroup, ControlLabel, Checkbox } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DateTimePicker from '../DateTimePicker';
import './StudySessionForm.css';

const StudySessionForm = (props) => {
    return (
    <form>
        <FormGroup>
            <ControlLabel>Which learning goal are you studying for?</ControlLabel>
            <FormControl onChange={props.handleSessionInputChange} name="goalId" componentClass="select" placeholder="select">
                  <option value="">Select one...</option>
                  {props.goals.map(goal=> (
                      <option key ={goal._id} value={goal._id}>{goal.category} - {goal.goal}</option>

                  ))}               
            </FormControl>
        </FormGroup>

         <FormGroup>
            <ControlLabel>Start Date &amp; Time</ControlLabel>
                <DateTimePicker name="start" timeframe={props.start} handleChange={props.handleStartChange}    
    
                />
        </FormGroup>

        <FormGroup>
            <ControlLabel>End Date and Time</ControlLabel>
            <DateTimePicker name="end" timeframe={props.end} handleChange={props.handleEndChange} />   

        </FormGroup>

        <FormGroup>
            <ControlLabel>What topics will you be studying?</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="example: data types, array methods"
                    name="title"
                    onChange={props.handleSessionInputChange}
                    value={props.title}
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
        <div className="sessionFormBtnContainer">
        <Button className="createSessionBtn" onClick={props.createSessionSubmit}>Schedule Study Session</Button>
        <Button className="cancelSessionBtn" onClick={props.hideSessionModal}>Cancel</Button>
        </div>
    </form>
    );
}

export default StudySessionForm;