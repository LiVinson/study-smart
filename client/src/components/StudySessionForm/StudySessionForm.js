import React from 'react'
import { FormControl, FormGroup, ControlLabel, Checkbox } from "react-bootstrap";
import { Button } from "react-bootstrap";
import DateTimePicker from '../DateTimePicker';

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
            {/* <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    name="start"
                    onChange={props.handleSessionInputChange}
                    value={props.start}
                /> */}
                <DateTimePicker name="start" timeframe={props.start} handleChange={props.handleStartChange}    
    
                />
        </FormGroup>

        <FormGroup>
            <ControlLabel>End Date and Time</ControlLabel>
            {/* <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="I want to be able to..."
                    name="end"
                    onChange={props.handleEndChange}
                    value={props.end}
                /> */}
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

        
        <Button onClick={props.createSessionSubmit}>Schedule Study Session</Button>
        <Button onClick={props.hideSessionModal}>Cancel</Button>

    </form>
    );
}

export default StudySessionForm;