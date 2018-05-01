import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './ViewLearningGoal.css';
import NavbarBoot from '../../components/NavbarBoot';
import ButtonBar from '../../components/ButtonBar';
import { Grid, Row, Col } from 'react-bootstrap';
import GoalPanel from '../../components/GoalPanel';
import GoalPanelMessage from '../../components/GoalPanelMessage';
import GoalCard from '../../components/GoalCard';
import AddGoalForm from '../../components/AddGoalForm';
import ModalBoot from '../../components/ModalBoot';
import ProfileForm from '../../components/ProfileForm';
import ViewProfile from '../../components/ViewProfile';
import StudySessionForm from '../../components/StudySessionForm';
import moment from 'moment';
import API from '../../utils/API';


class ViewLearningGoal extends Component {
    state = {
        profile: {
            first_name: "",
			last_name: "",
			mobile_number: "",
			learner_status: "",
			goals: [],
			sessions: [],
			invitations: []
        },
        goal: {
            _id:"",
            barriers:"",
            category: "",
            due_date: "",
            createdAt: "",
            goal: "",
            measurement: "",
            sessions: [],
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
        pastSessions: [],
        upcomingSessions: [],
        showGoalModal: false,
		showSessionModal: false,
		showProfileModal: false,
		error: ""
    };

    componentDidMount() {
        // console.log("renderProps (goalData):", this.props.goalData);
        this.getProfile();
   };

    getProfile() {
        API.getLearnerProfile(this.props.auth.userId).then(response => {
            // console.log("profile -", response.data);
            // console.log("goals array inside of profile", response.data.goals);
            // console.log("id of goal to locate", this.props.match.match.params.goalId);
            const goal = response.data.goals.filter(goal => {
                return goal._id === this.props.goalData.match.params.goalId
            })[0];
            // console.log("goal after filtering the return profile based on Id", goal);
            const pastSessions = goal.sessions.filter(session => {
                // console.log("past event end time", session.end);
                // console.log("difference between now and session end time", (moment(session.end)).diff(moment()));
                return ((moment(session.end)).diff(moment()) < 0)
            });
            // console.log("past sessions", pastSessions );
            const upcomingSessions = goal.sessions.filter(session => {
                // console.log("past event end time", session.end);
                // console.log("difference between now and session end time", (moment(session.end)).diff(moment()));
                return ((moment(session.end)).diff(moment()) > 0)
            });
            // console.log("upcoming sessions", upcomingSessions );
            this.setState({
                profile: response.data,
                goal: goal,
                pastSessions: pastSessions,
                upcomingSessions: upcomingSessions
            })
        })
        .catch(err => console.log(err))
      
        
    };

    componentDidUpdate(prevProps) {
        console.log("prevProps.goalData.location:", prevProps.goalData.location);
        console.log("this.props.goalData.location:", this.props.goalData.location);

        if (this.props.goalData.location !== prevProps.goalData.location) {
          this.onRouteChanged();
        }
      };
    
      onRouteChanged() {
        console.log("ROUTE CHANGED");
        this.getProfile();
      };

    studyHoursCompleted(items, prop) {
        return items.reduce((acc, session) => {
            return (acc + session[prop]/60);
        }, 0)
    };

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
    

	//CREATE NEW GOAL FORM
	showSessionModal = () => {
		console.log("show session modal");
		this.setState({
			showSessionModal: true
		})
    };

    hideSessionModal = () => {
		const newSession = { ...this.state.newSession, goalId: "", title: "", location: "", start: moment(), end: moment() };
		this.setState({
			newSession: newSession,
			showSessionModal: false
		})
	};
    
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
        console.log("create study session clicked!");
		API.createSession(this.state.newSession, this.props.auth.userId)
			.then((response) => {
				console.log(response.data);
				this.hideSessionModal();
				this.getProfile(); //Redirect to profile page
			})
	};


     render() {
        console.log("renderProps (goalData):", this.props.goalData);
        return (
            <div>
				<NavbarBoot home={false} first_name={this.state.profile.first_name} handleLogout={this.props.handleLogout} toggleProfileModal={this.toggleProfileModal}/>
				<ButtonBar goalCreated={this.state.profile.goals.length} showGoalModal={this.showGoalModal} showSessionModal={this.showSessionModal}  />

                <Grid fluid={true} className="pageContainer">

                    <Row className="mainRow">
                        <Col sm={3} xs={12}>
                            <GoalPanel>
                            <h2>Learning Goals</h2>
                            {this.state.profile.goals.length ? (									
                                    <div> 
                                       {this.state.profile.goals.slice(0).reverse().map(goal => (

                                                   <GoalCard key={goal._id} goalId={goal._id} category={goal.category} goal={goal.goal} due_date={goal.due_date} />

                                       ))}
                                    </div>
                                   
                               ) : (
                                       <GoalPanelMessage message='Looks like you need to create some learning goals!' />
                                   )}

                            </GoalPanel>
                        </Col>
                        <Col className="learningGoalCol" sm={9} xs={12}>
                            <div className='learningGoalContainer'>
                                <Row>
                                    <Col sm={12}>
                                        <div className='learningGoalInfo'>
                                            <h2>Goal Category: {this.state.goal.category}</h2>
                                            <p><span>My Goal: </span> {this.state.goal.goal}</p>
                                            <p><span>Measurement: </span>{this.state.goal.measurement}</p>
                                            <p><span>Barriers: </span>{this.state.goal.barriers}</p>
                                            <p><span>Created Date: </span>{moment(this.state.goal.createdAt).format("dddd, MMMM, D, YYYY")}</p>
                                            <p><span>Due Date: </span>{moment(this.state.goal.due_date).format("dddd, MMMM, D, YYYY")}</p>
                                            <p><span>Total Study Hours Completed: </span>{this.state.pastSessions ? (this.studyHoursCompleted(this.state.pastSessions, "duration")): ("0 minutes - It looks like you need to hit the books!")}</p>

                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm={6}>
                                        <div className='pastSessionsDiv'>
                                            <h3>Past Study Sessions:</h3>    
                                   
                                            {this.state.pastSessions.length ? (
                                              this.state.pastSessions.map(session => {
                                                  return(
                                                  <div className= "sessionDiv" key={session._id}>
                                                    <p><span className="bold">Topics: </span>{session.title}</p>
                                                    <p><span className="bold">Date: </span>{moment(session.end).format("MMMM Do YYYY, h:mm A")}</p>
                                                 </div>)
                                                })
                                            ) : (<div>You have not completed any study sessions for this goal yet!</div>)
                                        }
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                    <div className='upcomingSessionsDiv'>
                                            <h3>Upcoming Study Sessions:</h3>  
                                            {this.state.upcomingSessions.length ? (
                                              this.state.upcomingSessions.map(session => {
                                                  return(
                                                  <div className= "sessionDiv" key={session._id}>
                                                    <p><span className="bold">Topics: </span>{session.title}</p>
                                                    <p><span className="bold">Date: </span>{moment(session.end).format("MMMM Do YYYY, h:mm A")}</p>
                                                    
                                                </div>)
                                                })
                                            ) : (<div>You do not have any study sessions scheduled for this goal.</div>)
                                        }
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
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
};

export default ViewLearningGoal;

