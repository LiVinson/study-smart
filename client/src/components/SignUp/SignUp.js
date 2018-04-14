import React from 'react';
import "./SignUp.css";
// import {Link} from 'react-router-dom';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';


const SignUp = props=> {

    // getValidationState: () => {


    // }


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

                    />
                </FormGroup>
                <FormGroup
                // validationState={this.getValidationState()
                    >
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        label="Password"
                        placeholder=""
                        onChange={props.handleChange}
                        name='password'
                        value={props.password}
                    />
                </FormGroup>
                <br />
                <Button className='signUpBtn' block type='submit' name="/auth/signup" onClick={props.handleSubmit}>Sign Up for Study Smart!</Button>
            </form>
		</div>
	);
}

export default SignUp;