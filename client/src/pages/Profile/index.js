import React, { Component } from 'react';
import "./style.css";

class Profile extends Component {
	state = {
		firstLogin:false
	};


	render = () => {
		return (
		this.state.firstLogin ? 
		(
			<div>
				<h1>Congrats, it's your first login!</h1>
				<p>{this.props.auth}</p>
				<button onClick = {this.props.handleLogout}>Log Out</button>
			</div>
		) : (
			<div>
				<h1>It looks like you've been here before!</h1>
				<p>{this.props.auth}</p>
				<button onClick = {this.props.handleLogout}>Log Out</button>
			</div>


		)
	)
	}
};

export default Profile;