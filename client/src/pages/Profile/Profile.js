import React, { Component } from 'react';
import './style.css';
import NavbarBoot from '../../components/NavbarBoot';
import { Grid, Row, Col } from 'react-bootstrap';
import GoalPanel from '../../components/GoalPanel';
import GoalPanelMessage from '../../components/GoalPanelMessage';
import API from "../../utils/API";
import ModalBoot from '../../components/ModalBoot';
import ProfileForm from '../../components/ProfileForm';
class Profile extends Component {
	state = {
		firstLogin: true,
		profile: {
			first_name: "",
			last_name: "",
			mobile_number: "",
			learner_status: "",
			subjects: [],
		},
		learningGoals: [],
		studySessions: [],
		error: ""
	};

	componentDidMount() {
		this.getProfile()
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		let profile = Object.assign({}, this.state.profile);
		profile[name]=value;
		this.setState({
			profile: profile
		})
	};

	createProfileSubmit = (event) => {
		event.preventDefault();
		const userProfile = Object.assign({userId: this.props.auth.userId}, this.state.profile);
		API.createLearnerProfile(userProfile).then(response=> {
			console.log("response from createLearnerProfile", response);
			
			this.setState({firstLogin: false})
		})
	};

	getProfile = () => {
		API.getLearnerProfile(this.props.auth.userId).then(response => {
			console.log("response from API.getLearnerProfile", response);
			console.log("response from API.getLearnerProfile", response.data);
			if (response.data) {
				this.setState({
					profile: response.data
				})
			} else {
				this.setState({
					firstLogin: true
				})
			}
		})
	};

	render() {
		return (
			<div>
				<NavbarBoot />
				<Grid fluid={true}>
					<Row>
						<Col sm={3}>
							<GoalPanel>

								{this.state.learningGoals.length ? (
									<p>list of learning goals</p>
								) : (
										<GoalPanelMessage message='Looks like you need to create some learning goals!' />
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

							{this.state.firstLogin ?
								<ModalBoot title='Create Your Profile!'>
									<ProfileForm
										handleInputChange={this.handleInputChange}
										createProfileSubmit={this.createProfileSubmit}
									/>
								</ModalBoot>
								: <div className="not-first">No modal</div>}
						</Col>
					</Row>
				</Grid>

			</div>
		);
	}
};

export default Profile;