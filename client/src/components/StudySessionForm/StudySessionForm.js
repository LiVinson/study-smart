import React from 'react'
import { FormControl, FormGroup, ControlLabel, Button } from "react-bootstrap";
import DateTimePicker from '../DateTimePicker';
import './StudySessionForm.css';

const StudySessionForm = props => {
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
           
                <FormControl.Static>
                    How Long are You Planning to Study (Make sure to account for time to take short breaks) 
                </FormControl.Static>
            
         
            <ControlLabel>Number of Hours</ControlLabel>

            <FormControl onChange={props.handleSessionInputChange} name="duration_hours" componentClass="select" placeholder="select">
                  <option value="0">0</option>
                  <option value="60">1</option>
                  <option value="120">2</option>
                  <option value="180">3</option>
                  <option value="240">4</option>
                  <option value="300">5</option>
                  <option value="360">6</option>
                  <option value="420">7</option>
                  <option value="480">8</option>
            </FormControl>
        </FormGroup>
        <FormGroup>
            <ControlLabel>Number of Minutes</ControlLabel>
            
            <FormControl onChange={props.handleSessionInputChange} name="duration_minutes" componentClass="select" placeholder="select">
                  <option value="0">0</option>
                  <option value="15">15</option>
                  <option value="30">30</option>
                  <option value="45">45</option>
   
            </FormControl>
        </FormGroup>
        <FormGroup>
            <ControlLabel>What topics will you be studying?</ControlLabel>
            <FormControl
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