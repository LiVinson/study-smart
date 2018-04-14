import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
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
			invitations: []
		},
		newGoal: {
			category: "",
			due_date: moment(),
			// goalId: "",
			measurement: "",
			barriers: "",
		},
		newSession: {

			goalId: "",
			title: "",
			location: "",
			start: moment(),
			end: moment()

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

	//Get user's profile data and save in state
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

	//Goal Form Input (all except date)
	handleGoalInputChange = event => {
		const { name, value } = event.target;
		let newGoal = Object.assign({}, this.state.newGoal);
		newGoal[name] = value;
		this.setState({
			newGoal: newGoal
		})
	};

	//Goal form input - date
	handleGoalDate = date => {
		let newGoal = Object.assign({}, this.state.newGoal);
		newGoal.due_date = date;
		this.setState({
			newGoal: newGoal
		})
	};

	//Goam form submission
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
		// console.log(event.target);
		const { name, value } = event.target;
		let newSession = Object.assign({}, this.state.newSession);
		newSession[name] = value;
		this.setState({
			newSession: newSession
		})
	};

	handleStartChange = date => {
		console.log(date);
		let newSession = Object.assign({}, this.state.newSession);
		newSession.start = date;
		this.setState({
			newSession: newSession
		});
	};

	handleEndChange = date => {
		console.log(date);
		let newSession = Object.assign({}, this.state.newSession);
		newSession.end = date;
		this.setState({
			newSession: newSession
		});
	}





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
		const newGoal = { ...this.state.newGoal, category: "", due_date: moment(), measurement: "", barriers: "" };
		this.setState({
			newGoal: newGoal,
			showGoalModal: false
		})
	};

	hideSessionModal = () => {
		const newSession = { ...this.state.newSession, goalId: "", title: "", location: "", start: moment(), end: moment() };
		this.setState({
			newSession: newSession,
			showSessionModal: false
		})
	};

	viewSchedule = (clickedGoal) => {
		alert("view profile page/calendar");
	}; //

	viewGoalDetails = (clickedGoal) => {
		alert("view details on this goal");
	}; //

	viewSessionDetails = (clickedEvent) => {
		console.log("event clicked!:", clickedEvent);
		// alert("view details on this study session");
		<Link to={"/studysession/" + clickedEvent._id}/>
	}; //Link  to event page with details

	viewStudyInvites = () => {
		alert("view your invites");
	}; //Link to view study invites

	render() {
		return (
			<div>
				<NavbarBoot home={false} handleLogout={this.props.handleLogout} />
				<ButtonBar first_name={this.state.profile.first_name} viewSchedule={this.viewSchedule} showGoalModal={this.showGoalModal} showSessionModal={this.showSessionModal} viewStudyInvites={this.viewStudyInvites} />
				<Grid fluid={true} className="pageContainer">
					<Row>
						<Col sm={3}>
							<GoalPanel showGoalForm={this.showGoalForm}>
								<h2>Learning Goals</h2>
								{this.state.profile.goals.length ? (
									<ul className="goalList">
									{/* <div> */}
										{this.state.profile.goals.map(goal => ( //update this to be a separate list
											<li key={goal._id}>
												<Link to={"/learninggoal/" + goal._id}>
													<GoalCard category={goal.category} goal={goal.goal} due_date={goal.due_date} />
												</Link>
											</li>
										))}
									{/* </div> */}
									</ul>
								) : (
										<GoalPanelMessage message='Looks like you need to create some learning goals!' />
									)}

							</GoalPanel>
						</Col>
						<Col sm={9}>
							<div className="mainContainer">
								<p>Study Schedule</p>
								<div className="calendarContainer">
									<Calendar studySessions={this.state.profile.sessions} viewSessionDetails={this.viewSessionDetails}/>
								</div>
							</div>

							{this.state.firstLogin ?
								<ModalBoot title='Create Your Profile!'>
									<ProfileForm
										handleInputChange={this.handleInputChange}
										createProfileSubmit={this.createProfileSubmit}
									/>
								</ModalBoot>
								: null}
							<ModalBoot closeButton show={this.state.showGoalModal} title='Add a Learning Goal'> <AddGoalForm handleGoalInputChange={this.handleGoalInputChange} handleGoalDate={this.handleGoalDate} createGoalSubmit={this.createGoalSubmit} hideGoalModal={this.hideGoalModal} due_date={this.state.newGoal.due_date} /></ModalBoot>
							<ModalBoot closeButton show={this.state.showSessionModal} goals={this.state.profile.goals} title='Schedule a New Study Session'> <StudySessionForm handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange} handleSessionInputChange={this.handleSessionInputChange} createSessionSubmit={this.createSessionSubmit} hideSessionModal={this.hideSessionModal} goals={this.state.profile.goals} start={this.state.newSession.start} end={this.state.newSession.end} /></ModalBoot>

						</Col>
					</Row>
				</Grid>

			</div>
		);
	}
};

export default Profile;