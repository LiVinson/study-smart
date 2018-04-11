import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';
import Calendar from '../../components/Calendar';
import NavbarBoot from '../../components/NavbarBoot';
import ButtonBar from '../../components/ButtonBar';
import { Grid, Row, Col } from 'react-bootstrap';
import GoalPanel from '../../components/GoalPanel';
import GoalPanelMessage from '../../components/GoalPanelMessage';
import GoalCard from '../../components/GoalCard';
import AddGoalForm from '../../components/AddGoalForm';
import API from "../../utils/API";
import ModalBoot from '../../components/ModalBoot';
import ProfileForm from '../../components/ProfileForm';
import StudySessionForm from '../../components/StudySessionForm';

class Profile extends Component {
	state = {
		firstLogin: false,
		profile: {
			first_name: "",
			last_name: "",
			mobile_number: "",
			learner_status: "",
			goals: [],
			sessions: [],
		},
		newGoal: {
			category: "",
			due_date: "",
			goalId: "",
			measurement: "",
			barriers: "",
		},
		newSession: {

			goalId: "",
			topic: "",
			location:"",
			start:"",
			end:"",

		},
		showGoalModal: false,
		showSessionModal: false,
		error: ""
	};

	componentDidMount() {
		this.getProfile()
	};

	//Profile Form input
	handleInputChange = event => {
		const { name, value } = event.target;
		let profile = Object.assign({}, this.state.profile);
		profile[name] = value;
		this.setState({
			profile: profile
		})
	};

	//Submit Profile Form
	createProfileSubmit = (event) => {
		event.preventDefault();
		const userProfile = Object.assign({ userId: this.props.auth.userId }, this.state.profile);
		API.createLearnerProfile(userProfile).then(response => {
			console.log("response from createLearnerProfile", response);

			this.setState({ firstLogin: false })
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

	//Goal Form Input
	handleGoalInputChange = event => {
		const { name, value } = event.target;
		let newGoal = Object.assign({}, this.state.newGoal);
		newGoal[name] = value;
		this.setState({
			newGoal: newGoal
		})
	};

	createGoalSubmit = () => {
		console.log("you've created a goal!");
		const goal = Object.assign({}, this.state.newGoal);
		API.createGoal(goal, this.props.auth.userId).then(() => {
			this.setState({
				showGoalModal: false
			});
			this.getProfile();
		})
	};

	handleSessionInputChange = event => {
		const { name, value } = event.target;
		let newSession = Object.assign({}, this.state.newSession);
		newSession[name] = value;
		this.setState({
			newSession: newSession
		})
	};


	createSessionSubmit = () => {
		console.log("you've created a study session!");
		const session = Object.assign({}, this.state.newSession);
		API.createSession(session, this.props.auth.userId).then(() => {
			this.setState({
				showSessionModal: false
			});
			this.getProfile();
		})
	};


	showSessionModal = () => {
		this.setState({
			showSessionModal: true
		})
	};

	
	showGoalModal = () => {
		this.setState({
			showGoalModal: true
		})
	};
		
	hideGoalModal = () => {
		this.setState({
			showGoalModal: false
		})
	};

	viewSchedule = (clickedGoal) => {
		alert("view profile page/calendar");
	}; //

	viewGoalDetails = (clickedGoal) => {
		alert("view details on this goal");
	}; //

	viewSessionDetails = (clickedEvent) => {
		alert("view details on this study session");
		// <Link to={"StudySession/" + book._id}/>
	}; //Link  to event page with details

	viewStudyInvites = () => {
		alert("view your invites");
	}; //Link to view study invites

	render() {
		return (
			<div>
				<NavbarBoot />
				<ButtonBar first_name={this.state.profile.first_name} viewSchedule={this.viewSchedule} showGoalModal={this.showGoalModal} showSessionModal={this.showSessionModal} viewStudyInvites={this.viewStudyInvites} />
				<Grid fluid={true} className="pageContainer">
					<Row>
						<Col sm={3}>
							<GoalPanel showGoalForm={this.showGoalForm}>
								<h2>Learning Goals</h2>
                                {this.state.profile.goals.length ? (
									<div>
                                	{this.state.profile.goals.map(goal => (
                                        <GoalCard key={goal._id} category={goal.category} goal={goal.goal} due_date={goal.due_date} />
											
									))}
									</div>
								 ) : (
										<GoalPanelMessage message='Looks like you need to create some learning goals!' />
									)}

							</GoalPanel>
						</Col>
						<Col sm={9}>
						<div className="mainContainer">
							<p>Study Schedule</p>
							<div className="calendarContainer">
								<Calendar />
							</div>
						</div>
							<p>{this.props.auth.username}</p>
								<button onClick={this.props.handleLogout}>Log Out</button>

							 {this.state.firstLogin ?
								<ModalBoot title='Create Your Profile!'>
									<ProfileForm
										handleInputChange={this.handleInputChange}
										createProfileSubmit={this.createProfileSubmit}
									/>
								</ModalBoot>
								: null}
							<ModalBoot closeButton show={this.state.showGoalModal} title='Add a Learning Goal'> <AddGoalForm handleGoalInputChange={this.handleGoalInputChange} createGoalSubmit={this.createGoalSubmit} hideGoalModal={this.hideGoalModal}/></ModalBoot>
							<ModalBoot closeButton show={this.state.showSessionModal} goals={this.state.profile.goals} title='Schedule a New Study Session'> <StudySessionForm handleSessionInputChange={this.handleSessionInputChange} createSessionSubmit={this.createSessionSubmit} goals={this.state.profile.goals}/></ModalBoot>

						</Col>
					</Row>
				</Grid>

			</div>
		);
	}
};

export default Profile;