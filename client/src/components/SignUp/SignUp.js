import React from 'react';
import "./SignUp.css";
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import ErrorMsgText from '../ErrorMsgText';


const SignUp = props => {

	return (
		<div className='signUpContainer'>
			<h1>SIGN UP</h1>
            <form>
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        type="email"
                        label="Email address"
                        placeholder="Example@email.com"
                        onChange={props.handleChange}
                        name='username'
                        value={props.username}
                        required
                    />
                </FormGroup>
                <FormGroup
                    validationState={props.getPassValidationState()}

                    >
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        label="Password"
                        placeholder=""
                        onChange={props.handleChange}
                        name='password'
                        value={props.password}
                        required
                    />
                </FormGroup>
                <br />
                <Button className='signUpBtn' block type='submit' name="/auth/signup" onClick={props.handleSubmit}>Sign Up for Study Smart!</Button>
                <ErrorMsgText>{props.authErrorMessage}</ErrorMsgText>

            </form>
		</div>
	);
}

export default SignUp;