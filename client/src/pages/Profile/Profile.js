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
		profile: {
			first_name: "",
			last_name: "",
			mobile_number: "",
			learner_status: "",
			goals: [],
			sessions: [],
			invitations: []
		},
		editProfile: {
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
		this.getProfile()
	};

	//CREATE USER PROFILE FORM

	//Profile Form input
	handleInputChange = event => {
		const { name, value } = event.target;

		if (this.state.firstLogin) {
			const profile = Object.assign({}, this.state.profile);
			profile[name] = value;
			this.setState({
				profile: profile
			})
		} else {
			const editProfile = Object.assign({}, this.state.editProfile);
			editProfile[name] = value;
			this.setState({
				editProfile: editProfile
			})
		}
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
				const ownerName = `${response.data.first_name} ${response.data.last_name[0]}.`
				const newSession = { ...this.state.newSession, owner_name: ownerName }

				this.setState({
					profile: response.data,
					newSession: newSession,
					viewProfile: true
				})
			} else {
				this.setState({
					firstLogin: true
				})
			}
		})
	};

	toggleProfileModal = () => {
		if (!this.state.showProfileModal) {
			const editProfile = Object.assign({}, this.state.editProfile);
			editProfile.first_name = this.state.profile.first_name;
			editProfile.last_name = this.state.profile.last_name;
			editProfile.mobile_number = this.state.profile.mobile_number;
			editProfile.learner_status = this.state.profile.learner_status;
			this.setState({
				showProfileModal: true,
				viewProfile: true,
				editProfile: editProfile
			})
		}
		else {
			this.setState({
				showProfileModal: false,
				viewProfile: true
			})
		}
	};

	editProfileForm = () => {
		console.log("edit profile clicked");

		this.setState({
			viewProfile: false,
			// editProfile: editProfile
		})
	};

	saveProfileEdit = () => {
		console.log("you have requested to edit your profile");
		const profile = this.state.editProfile;
		const userId = this.props.auth.userId
		API.editLearnerProfile(profile, userId).then(response=> {
			console.log(response);
			this.getProfile()
			})
	};
	

	//CREATE NEW GOAL FORM

	//Goal Form Input (all except date)
	handleGoalInputChange = event => {
		const { name, value } = event.target;
		const newGoal = Object.assign({}, this.state.newGoal);
		newGoal[name] = value;
		this.setState({
			newGoal: newGoal
		})
	};

	//Goal form input - date
	handleGoalDate = date => {
		const newGoal = Object.assign({}, this.state.newGoal);
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

	//CREATE NEW STUDY SESSION FORM

	handleSessionInputChange = event => {
		// console.log(event.target);
		const { name, value } = event.target;
		const newSession = Object.assign({}, this.state.newSession);
		newSession[name] = value;
		this.setState({
			newSession: newSession
		})
	};

	handleStartChange = date => {
		console.log(date);
		const newSession = Object.assign({}, this.state.newSession);
		newSession.start = date;
		this.setState({
			newSession: newSession
		});
	};

	createSessionSubmit = () => {
		API.createSession(this.state.newSession, this.props.auth.userId)
			.then((response) => {
				console.log(response.data);
				this.hideSessionModal();
				this.getProfile();
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
	handleStudyBuddyInputChange = event => {
		const { name, value } = event.target;
		const study_buddy = Object.assign({}, this.state.study_buddy);
		study_buddy[name] = value;
		this.setState({
			study_buddy: study_buddy
		})
	};

	handleStudyBuddySubmit = event => {
		event.preventDefault();
		const studyBuddyEmail = this.state.study_buddy.email.toLowerCase();
		API.checkEmailExists(studyBuddyEmail).then(response => {
			console.log("response received from API.checkEmail:", response.data)
			if (response.data === "null") { //invalid email

				const study_buddy = this.state.study_buddy;
				study_buddy.emailError = `${study_buddy.email} does not match any study Smart users.`

				this.setState({
					study_buddy: study_buddy
				})

			} else {
				const study_buddy = this.state.study_buddy;
				study_buddy.emailError = `${study_buddy.email} is a valid email address!.`
				//Send invite to this user
				this.setState({
					study_buddy: study_buddy
				}, this.inviteUser(response.data))

			}
		})
	};

	inviteUser = (buddyId) => {
		const session = this.state.selectedSession;
		API.sendSessionInvitation(buddyId, session).then(response => {
			console.log("response received from API.sendSessionInvitation", response.data)
		})
	};


	//MODAL CONTROLS
	showSessionModal = () => {
		console.log("show session modal");
		this.setState({
			showSessionModal: true
		})
	};


	showGoalModal = () => {
		console.log("show goal modal");
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


	viewGoalDetails = (clickedGoal) => {
		alert("view details on this goal");
	};

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

	viewStudyInvites = () => {
		alert("view your invites");
	}; //Link to view study invites

	render() {
		return (
			<div>
				<NavbarBoot home={false} first_name={this.state.profile.first_name} handleLogout={this.props.handleLogout} toggleProfileModal={this.toggleProfileModal}/>
				<ButtonBar goalCreated={this.state.profile.goals.length} showGoalModal={this.showGoalModal} showSessionModal={this.showSessionModal}  />
				<Grid fluid={true} className="pageContainer">
					<Row className="mainRow">
						<Col xs={12} sm={3}>
							<GoalPanel>
								<h2>Learning Goals</h2>
								{this.state.profile.goals.length ? (
									<div>
										{this.state.profile.goals.slice(0).reverse().map(goal => (
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
									<Calendar studySessions={this.state.profile.sessions} viewSessionDetails={this.viewSessionDetails} />
								</div>
							</div>

							<ModalBoot show={this.state.firstLogin} title='Welcome to Study SMART!'>
								<ProfileForm
									handleInputChange={this.handleInputChange}
									createProfileSubmit={this.createProfileSubmit}
								/>
							</ModalBoot>

							<ModalBoot show={this.state.showProfileModal} title='View &amp; Edit Your Profile'>
								<ViewProfile
									viewProfile={this.state.viewProfile}
									profile={this.state.profile}
									editProfileForm={this.editProfileForm}
									saveProfileEdit={this.saveProfileEdit}
									handleInputChange={this.handleInputChange}
									toggleProfileModal={this.toggleProfileModal}
									editProfile={this.state.editProfile}
									// createProfileSubmit={this.createProfileSubmit}
								/>
							</ModalBoot>

							<ModalBoot show={this.state.showGoalModal} title='Add a Learning Goal'>
								<AddGoalForm
									handleGoalInputChange={this.handleGoalInputChange}
									handleGoalDate={this.handleGoalDate}
									createGoalSubmit={this.createGoalSubmit}
									hideGoalModal={this.hideGoalModal}
									due_date={this.state.newGoal.due_date}
								/>
							</ModalBoot>

							<ModalBoot
								show={this.state.showSessionModal}
								goals={this.state.profile.goals}
								title='Schedule a New Study Session'>
								<StudySessionForm
									handleStartChange={this.handleStartChange}
									handleEndChange={this.handleEndChange}
									handleSessionInputChange={this.handleSessionInputChange}
									createSessionSubmit={this.createSessionSubmit}
									hideSessionModal={this.hideSessionModal}
									goals={this.state.profile.goals}
									start={this.state.newSession.start}
									end={this.state.newSession.end}
								/>
							</ModalBoot>

							<SessionTabModal
								show={this.state.showSessionDetailModal}
								selectedSession={this.state.selectedSession}
								goals={this.state.profile.goals}
								handleResourceInputChange={this.handleResourceInputChange}
								handleResourceSubmit={this.handleResourceSubmit}
								hideSessionDetails={this.hideSessionDetails}
								auth={this.props.auth}
								study_buddy={this.state.study_buddy}
								handleStudyBuddyInputChange={this.handleStudyBuddyInputChange}
								handleStudyBuddySubmit={this.handleStudyBuddySubmit}
							/>
						</Col>
					</Row>
				</Grid>

			</div>
		);
	}
};

export default Profile;