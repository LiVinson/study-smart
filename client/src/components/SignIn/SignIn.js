import React from 'react';
import './SignIn.css';
import { FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import ErrorMsgText from '../ErrorMsgText';

const SignIn = props => {
    return (
        <div className='signInContainer'>
            <h1>SIGN IN</h1>
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
                <Button className='signInBtn' block type='submit' name="/auth/signin" onClick={props.handleSubmit}>Sign In to study SMART!</Button>
                <ErrorMsgText>{props.authErrorMessage}</ErrorMsgText>
            </form>
        </div>
    );

}

export default SignIn;