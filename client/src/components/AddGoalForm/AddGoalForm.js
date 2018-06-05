import React from 'react';
import { FormControl, FormGroup, ControlLabel } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./AddGoalForm.css";
import DateSelector from '../DateSelector';

const AddGoalForm = props => {
    return (
    <form>
        <FormGroup>
            <ControlLabel>What category is your learning goal?</ControlLabel>
            <FormControl onChange={props.handleGoalInputChange} value={props.category} name="category" componentClass="select" placeholder="select">
                    <option value="">Select One...</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Science">Science</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="History/Government">History/Government</option>
                    <option value="Social Sciences">Social Sciences</option>
                    <option value="English">English</option>
                    <option value="Foriegn Language">Foriegn Language</option>
                    <option value="Other">Other</option>
            </FormControl>
        </FormGroup>

        <FormGroup>
            <ControlLabel>What is your learning goal?</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="I want to learn..."
                    name="goal"
                    onChange={props.handleGoalInputChange}
                    value={props.goal}
                />
        </FormGroup>

        <FormGroup>
            <ControlLabel>How will you know you have acheived your goal?</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    placeholder="I will be able to..."
                    name="measurement"
                    onChange={props.handleGoalInputChange}
                    value={props.measurement}
                />
        </FormGroup>

        <FormGroup>
            <ControlLabel>When do you want to have acheive this goal by?</ControlLabel>
                <DateSelector 
                    name="due_date"
                    due_date={props.due_date}
                    handleGoalDate={props.handleGoalDate}
                />
        </FormGroup>

                <FormGroup>
            <ControlLabel>What are some potential barriers to acheiving your goal?</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    placeholder=""
                    name="barriers"
                    onChange={props.handleGoalInputChange}
                    value={props.barriers}
                />
        </FormGroup>
        <div className='goalFormBtnContainer'>
            <Button className="addGoalBtn" onClick={props.createGoalSubmit}>Add Learning Goal</Button>
            <Button className="cancelGoalBtn" onClick={props.hideGoalModal}>Cancel</Button>
        </div>
    </form>
    );
}

export default AddGoalForm;