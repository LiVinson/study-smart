import React, { Component } from 'react';
import './style.css';
import NavbarBoot from '../../components/NavbarBoot';
import { Grid, Row, Col } from 'react-bootstrap';
import GoalPanel from '../../components/GoalPanel';
import GoalPanelMessage from '../../components/GoalPanelMessage';


class Profile extends Component {
	state = {
		firstLogin: false,
		profile: {
			first_name: "",
			last_name: "",
			mobile_number: "",
		},
		learningGoals: [],
		studySessions: [],
		error: ""
	};

	// componentDidMount() {
	// 	this.getProfile()
	// };

	// handleFormInput = event => {
	// 	const { name, value } = event.target;
	// 	this.setState({
	// 		[name]: value
	// 	})
	// };

	// createProfile = () => {
	// };

	// getProfile = () => {
	// }

	render() {
		return (
			<div>
			 	{this.state.firstLogin ?
					(
						<div>
							<h1>Congrats, it's your first login!</h1>
							<p>{this.props.auth}</p>
							<button onClick={this.props.handleLogout}>Log Out</button>
						</div>
					) : (
						<div>
							<NavbarBoot />
							<Grid fluid={true}>
								<Row>
									<Col sm={3}>
										<GoalPanel>
											
											{this.state.learningGoals.length ? (
												<p>list of learning goals</p>
											) : (
												<GoalPanelMessage message='Looks like you need to create some learning goals!'/>						
											)}
												
										</GoalPanel>
									</Col>
									<Col sm={9}>
										<div>
											<h1>React Calendar</h1>
											<h1>It looks like you've been here before!</h1>
											<p>{this.props.auth.username}</p>
											<button onClick={this.props.handleLogout}>Log Out</button>
										</div>
									</Col>
								</Row>
							</Grid>
						</div>
					)}
			</div>
		)
	}
};

export default Profile;