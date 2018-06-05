import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
import ViewProfile from '../../components/ViewProfile';
import StudySessionForm from '../../components/StudySessionForm';
import SessionTabModal from '../../components/SessionTabModal';

class Profile extends Component {
	state = {
		firstLogin: false,
		profile: { //To be deleted, stored in App state
			first_name: "",
			last_name: "",
			mobile_number: "",
			learner_status: "",
			goals: [],
			sessions: [],
			invitations: []
		},
		editProfile: { //To be deleted, stored in App state
			first_name: "",
			last_name: "",
			mobile_number: "",
			learner_status: ""
		},
		viewProfile: true,
		newGoal: {
			category: "",
			due_date: moment(),
			// goalId: "",
			measurement: "",
			barriers: "",
		},
		newSession: {
			goalId: "",
			owner: this.props.auth.userId,
			owner_name: "",
			title: "",
			start: moment(),
			duration_hours: 0,
			duration_minutes: 0,
			location: "",
		},
		selectedSession: {
			_id: "",
			active: true,
			title: "",
			owner: "",
			owner_name: "",
			start: "",
			duration: "",
			end: "",
			location: "",
			createdAt: "",
			updatedAt: "",
			invitees: [],
			resources: []
		},
		newResource: {
			description: "",
			url: ""
		},
		study_buddy: {
			email: "",
			emailError: ""
		},

		showGoalModal: false,
		showSessionModal: false,
		showSessionDetailModal: false,
		showProfileModal: false,
		error: ""
	};

	componentDidMount() {
		this.props.getProfile()
	};


	//Submit Profile Form
	createProfileSubmit = (event) => { //TO be deleted, passed down as prop
		event.preventDefault();
		const userProfile = Object.assign({ userId: this.props.auth.userId }, this.props.profile);
		API.createLearnerProfile(userProfile).then(response => {
			console.log("response from createLearnerProfile", response);

			this.props.profileCreated();
		})
	};
	
	//ADD NEW RESOURCE FORM

	handleResourceInputChange = event => {
		// console.log(event.target);
		const { name, value } = event.target;
		let newResource = Object.assign({}, this.state.newResource);
		newResource[name] = value;
		this.setState({
			newResource: newResource
		})
	};

	handleResourceSubmit = event => {
		event.preventDefault();
		const newResource = { ...this.state.newResource };
		const sessionId = this.state.selectedSession._id;
		API.addSessionResource(newResource, sessionId).then(response => {
			console.log("response from adding newResource, and updating assiociated event:", response.data)
			API.getSession(sessionId).then(responseSession => {
				console.log("response from getting event (should have updated resource),", responseSession.data);
				this.setState({ selectedSession: responseSession.data })
			})
		})
	};

	//INVITE STUDYBUDDY FORM
	// handleStudyBuddyInputChange = event => {
	// 	const { name, value } = event.target;
	// 	const study_buddy = Object.assign({}, this.state.study_buddy);
	// 	study_buddy[name] = value;
	// 	this.setState({
	// 		study_buddy: study_buddy
	// 	})
	// };

	// handleStudyBuddySubmit = event => {
	// 	event.preventDefault();
	// 	const studyBuddyEmail = this.state.study_buddy.email.toLowerCase();
	// 	API.checkEmailExists(studyBuddyEmail).then(response => {
	// 		console.log("response received from API.checkEmail:", response.data)
	// 		if (response.data === "null") { //invalid email

	// 			const study_buddy = this.state.study_buddy;
	// 			study_buddy.emailError = `${study_buddy.email} does not match any study Smart users.`

	// 			this.setState({
	// 				study_buddy: study_buddy
	// 			})

	// 		} else {
	// 			const study_buddy = this.state.study_buddy;
	// 			study_buddy.emailError = `${study_buddy.email} is a valid email address!.`
	// 			//Send invite to this user
	// 			this.setState({
	// 				study_buddy: study_buddy
	// 			}, this.inviteUser(response.data))

	// 		}
	// 	})
	// };

	// inviteUser = (buddyId) => {
	// 	const session = this.state.selectedSession;
	// 	API.sendSessionInvitation(buddyId, session).then(response => {
	// 		console.log("response received from API.sendSessionInvitation", response.data)
	// 	})
	// };


	//MODAL CONTROLS
	// showSessionModal = () => { //To be deleted, passed down from App as prop
	// 	console.log("show session modal");
	// 	this.setState({
	// 		showSessionModal: true
	// 	})
	// };


	// showGoalModal = () => { //To be deleted, passed down from APp as prop
	// 	console.log("show goal modal");
	// 	this.setState({
	// 		showGoalModal: true
	// 	})
	// };

	// hideGoalModal = () => { //To be deleted, passed down from App as prop
	// 	const newGoal = { ...this.state.newGoal, category: "", due_date: moment(), measurement: "", barriers: "" };
	// 	this.setState({
	// 		newGoal: newGoal,
	// 		showGoalModal: false
	// 	})
	// };

	// hideSessionModal = () => { //To be deleted, pass down from App as prop
	// 	const newSession = { ...this.state.newSession, goalId: "", title: "", location: "", start: moment(), end: moment() };
	// 	this.setState({
	// 		newSession: newSession,
	// 		showSessionModal: false
	// 	})
	// };

	viewSessionDetails = (clickedEvent) => {
		// console.log("event clicked! - before formatting:", clickedEvent);
		API.getSession(clickedEvent._id).then(response => {
			const selectedSession = { ...response.data, }
			selectedSession.start = moment(selectedSession.start).format("dddd, MMMM, D, YYYY,  h:mm A"); //copies data and formats, but does not impact original
			selectedSession.end = moment(selectedSession.end).format("dddd, MMMM, D, YYYY,  h:mm A");
			console.log("selectedSession after formatting:", selectedSession);

			this.setState({
				selectedSession: selectedSession,
				showSessionDetailModal: true
			})
		})
	};

	hideSessionDetails = () => {
		const selectedSession = {
			_id: "",
			active: true,
			title: "",
			owner: "",
			owner_name: "",
			start: "",
			duration: "",
			end: "",
			location: "",
			createdAt: "",
			updatedAt: "",
			invitees: [],
			resources: []
		};
		this.setState({
			selectedSession: selectedSession,
			showSessionDetailModal: false
		})
	};

	// viewStudyInvites = () => {
	// 	alert("view your invites");
	// }; //Link to view study invites

	render() {
		console.log("profile page has been rendered again!")
		return (
			<div>
				
				<NavbarBoot home={false} first_name={this.props.profile.first_name} handleLogout={this.props.handleLogout} toggleProfileModal={this.props.toggleProfileModal}/>
				<ButtonBar goalCreated={this.props.profile.goals.length} showGoalModal={this.props.showGoalModal} showSessionModal={this.props.showSessionModal}  />
				<Grid fluid={true} className="pageContainer">
					<Row className="mainRow">
						<Col xs={12} sm={3}>
							<GoalPanel>
								<h2>Learning Goals</h2>
								{this.props.profile.goals.length ? (
									<div>
										{this.props.profile.goals.slice(0).reverse().map(goal => (
											<GoalCard key={goal._id} goalId={goal._id} category={goal.category} goal={goal.goal} due_date={goal.due_date} />
										))}
									</div>
								) : (
										<GoalPanelMessage>
											<p>Looks Like You need to Create Your First Learning Goal!</p>
											<p>Once you have at least 1 learning goal, you can schedule study sessions and view them in your calendar</p>
										</GoalPanelMessage>
									)}
							</GoalPanel>
						</Col>
						<Col className="calendarCol" xs={12} sm={9} >
							<div className="mainContainer">
								<h2>Study Schedule</h2>
								<div className="calendarContainer">
									<Calendar studySessions={this.props.profile.sessions} viewSessionDetails={this.viewSessionDetails} />
								</div>
							</div>

							<ModalBoot show={this.props.firstLogin} title='Welcome to Study SMART!'>
								<ProfileForm
									handleProfileInputChange={this.props.handleProfileInputChange}
									createProfileSubmit={this.createProfileSubmit}
								/>
							</ModalBoot>

							<ModalBoot show={this.props.modalToggle.profileModal} title='View &amp; Edit Your Profile'>
								<ViewProfile
									viewProfile={this.props.viewProfile}
									profile={this.props.profile}
									editProfileFormClicked={this.props.editProfileFormClicked}
									saveProfileEdits={this.props.saveProfileEdits}
									handleProfileInputChange={this.props.handleProfileInputChange}
									toggleProfileModal={this.props.toggleProfileModal}
									editProfile={this.props.editProfile}
									// createProfileSubmit={this.createProfileSubmit}
								/>
							</ModalBoot>

							<ModalBoot show={this.props.modalToggle.goalModal} title='Add a Learning Goal'>
								<AddGoalForm
									handleGoalInputChange={this.props.handleGoalInputChange}
									handleGoalDate={this.props.handleGoalDate}
									createGoalSubmit={this.props.createGoalSubmit}
									hideGoalModal={this.props.hideGoalModal}
									due_date={this.props.newGoal.due_date}

								/>
							</ModalBoot>

							<ModalBoot
								show={this.props.modalToggle.sessionModal}
								goals={this.props.profile.goals}
								title='Schedule a New Study Session'>
								<StudySessionForm
									handleStartChange={this.props.handleStartChange}
									// handleEndChange={this.handleEndChange}
									handleSessionInputChange={this.props.handleSessionInputChange}
									createSessionSubmit={this.props.createSessionSubmit}
									hideSessionModal={this.props.hideSessionModal}
									goals={this.props.profile.goals}
									start={this.props.newSession.start}
									end={this.props.newSession.end}
								/>
							</ModalBoot>

							<SessionTabModal
								show={this.state.showSessionDetailModal}
								selectedSession={this.state.selectedSession}
								goals={this.props.profile.goals}
								handleResourceInputChange={this.handleResourceInputChange}
								handleResourceSubmit={this.handleResourceSubmit}
								hideSessionDetails={this.hideSessionDetails}
								auth={this.props.auth}
								// study_buddy={this.state.study_buddy}
								// handleStudyBuddyInputChange={this.handleStudyBuddyInputChange}
								// handleStudyBuddySubmit={this.handleStudyBuddySubmit}
							/>
						</Col>
					</Row>
				</Grid>

			</div>
		);
	}
};

export default Profile;