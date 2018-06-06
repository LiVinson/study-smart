import React, { Component } from 'react';
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
        console.log("renderProps (goalData):, passed in as props.goalData", this.props.goalData);
        this.retrieveGoal();
   };

	 retrieveGoal() {
		console.log("profile.goals saved in Apps state passed down to View Learning Goal", this.props.profile.goals)

		const goal = this.props.profile.goals.filter(goal => {
			return goal._id === this.props.goalData.match.params.goalId
		})[0];

		console.log("const goal:", goal);

		this.findPastAndUpcomingSessions(goal);
	};

	findPastAndUpcomingSessions(goal) {
		console.log("goal insie findPastandUpcoming:", goal)
		const pastSessions = 
			goal.sessions.filter(session => {
              	return ((moment(session.end)).diff(moment()) < 0)
            });
			
		const upcomingSessions =
			goal.sessions.filter(session => {
                return ((moment(session.end)).diff(moment()) > 0)
			});
			

        this.setState({
			goal: goal,
			pastSessions: pastSessions,
			upcomingSessions: upcomingSessions
        })
	};

	//Checks if there was an update in the LearningGoal prop, and compares previous location to current location
    componentDidUpdate(prevProps) {
        console.log("prevProps.goalData.location:", prevProps.goalData.location);
        console.log("this.props.goalData.location:", this.props.goalData.location);

        if (this.props.goalData.location !== prevProps.goalData.location) {
			console.log("the locations are not the same, so the learning goal component updated when you selected something")
          this.onRouteChanged();
        }
      };
	
	  //Called if the component has updated, and location has changed (triggered when new LG clicked)
      onRouteChanged() {
        console.log("ROUTE CHANGED");
        this.retrieveGoal();
      };

	  //Takes array of study events, and sums the duration property/60 (to get # of hours from minutes) and returns total
    calculateStudyHoursCompleted(items, prop) {
        return items.reduce((acc, session) => {
            return (acc + session[prop]/60);
        }, 0)
    };

     render() {
        console.log("renderProps (goalData):", this.props.goalData);
        return (
            <div>
				<NavbarBoot home={false} first_name={this.props.profile.first_name} handleLogout={this.props.handleLogout} toggleProfileModal={this.props.toggleProfileModal}/>
				<ButtonBar goalCreated={this.props.profile.goals.length} showGoalModal={this.props.showGoalModal} showSessionModal={this.props.showSessionModal}  />

                <Grid fluid={true} className="pageContainer">

                    <Row className="mainRow">
                        <Col sm={3} xs={12}>
                            <GoalPanel>
                            <h2>Learning Goals</h2>
                            {this.props.profile.goals.length ? (									
                                    <div> 
                                       {this.props.profile.goals.slice(0).reverse().map(goal => (

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
                                            <p><span>Total Study Hours Completed: </span>{this.state.pastSessions ? (this.calculateStudyHoursCompleted(this.state.pastSessions, "duration")): ("0 minutes - It looks like you need to hit the books!")}</p>

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

                            {/* ACTION - Confirm create profile modal can be deleted from this page */}
                            <ModalBoot show={this.state.firstLogin} title='Welcome to Study SMART!'>
								<ProfileForm
									handleProfileInputChange={this.props.handleProfileInputChange}
									createProfileSubmit={this.createProfileSubmit}
								/>
							</ModalBoot>

							<ModalBoot show={this.props.modalToggle.ProfileModal} title='View &amp; Edit Your Profile'>
								<ViewProfile
									viewProfile={this.state.viewProfile} //ACTION - determine if state in this component needed, or should be props
									profile={this.state.profile}
									editProfileFormClicked={this.props.editProfileFormClicked}
									saveProfileEdits={this.props.saveProfileEdits}
									handleProfileInputChange={this.props.handleProfileInputChange}
									toggleProfileModal={this.props.toggleProfileModal}
									editProfile={this.state.editProfile}
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
								goals={this.state.profile.goals}
								title='Schedule a New Study Session'>
								<StudySessionForm
									handleStartChange={this.props.handleStartChange}
									handleEndChange={this.handleEndChange}
									handleSessionInputChange={this.props.handleSessionInputChange}
									createSessionSubmit={this.props.createSessionSubmit}
									hideSessionModal={this.props.hideSessionModal}
									goals={this.props.profile.goals}
									start={this.props.newSession.start}
									end={this.props.newSession.end}
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

