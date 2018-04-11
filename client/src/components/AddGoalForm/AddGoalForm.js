import React from 'react';
import { FormControl, FormGroup, ControlLabel, Checkbox } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./AddGoalForm.css";

const AddGoalForm = (props) => {
    return (
    <form>
        <FormGroup>
            <ControlLabel>What category is your learning goal?</ControlLabel>
            <FormControl onChange={props.handleGoalInputChange} value={props.category} name="category" componentClass="select" placeholder="select">
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
            <ControlLabel>What is your goal?</ControlLabel>
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
            <ControlLabel>How will you know you have acheived your goal?</ControlLabel>
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
            <ControlLabel>When do you want to have acheive this goal by?</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="date"
                    placeholder="MM/DD/YYYY"
                    name="due_date"
                    onChange={props.handleGoalInputChange}
                    value={props.due_date}
                />
        </FormGroup>

                <FormGroup>
            <ControlLabel>What are some potential barriers to acheiving your goal?</ControlLabel>
            <FormControl
                    // id="formControlsText"
                    type="text"
                    label="Text"
                    placeholder="I want to be able to..."
                    name="barriers"
                    onChange={props.handleGoalInputChange}
                    value={props.barriers}
                />
        </FormGroup>

        <Button className="addGoalBtn" onClick={props.createGoalSubmit}>Add Goal</Button>
        <Button className="cancelGoalBtn" onClick={props.hideGoalModal}>Cancel</Button>

    </form>
    );
}

export default AddGoalForm;