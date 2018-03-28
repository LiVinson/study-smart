import React from 'react';
import "./style.css";
// import { Link } from 'react-router-dom';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';

const HomePage = (props) => {
	
		return (
			<div>

				<SignIn
					handleChange={props.handleChange}
					handleSubmit={props.handleSubmit}
					username={props.username}
					password={props.password} 
					/>
				<SignUp
					handleChange={props.handleChange}
					handleSubmit={props.handleSubmit}
					username={props.username}
					password={props.password}
					/>

			</div>
		)
	

};

export default HomePage;