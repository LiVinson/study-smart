import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ViewLearningGoal.css';
import NavbarBoot from '../../components/NavbarBoot';
import ButtonBar from '../../components/ButtonBar';
import { Grid, Row, Col } from 'react-bootstrap';
import GoalPanel from '../../components/GoalPanel';
import GoalPanelMessage from '../../components/GoalPanelMessage';
import GoalCard from '../../components/GoalCard';
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
            due_date:"",
            goal: "",
            measurement: "",
            sessions: [],
        }
    };

    componentDidMount() {
        console.log("userId before API method:", this.props.auth.userId);
        console.log("goalId before API methods:", this.props.match.match.params.goalId);
        API.getLearnerProfile(this.props.auth.userId).then(response => {
            console.log("profile -", response.data);
            this.setState({
                profile: response.data
            })
        })
        .then(() => {
            // console.log("goalId:", this.props.match.match.params.id)
            API.getGoal(this.props.match.match.params.goalId)
            .then(res => this.setState({ goal: res.data }))
            .catch(err => console.log(err));


        })
    };

    // getPastEvents() {
    //     this.state.profile.goals.sessions.filter(session => {
    //         return ((session.end).diff(moment()) < 0)
    //      })
    // }

    // getUpcomingEvents() {
    //     this.state.profile.goals.sessions.filter(session => {
    //         const endDate=session.end;
    //         console.log(endDate);
    //         const now = moment()
    //         return ((moment(endDate)).diff(now) > 0)
    //      })
    // }

    render() {
        return (
            <div>
                <NavbarBoot home={false} first_name={this.state.profile.first_name} handleLogout={this.props.handleLogout}/>
                <Grid fluid={true} className="pageContainer">
                <ButtonBar first_name={this.state.profile.first_name} showGoalModal={this.showGoalModal} showSessionModal={this.showSessionModal} viewStudyInvites={this.viewStudyInvites}/>

                    <Row>
                        <Col md={3} sm={12}>
                            <GoalPanel>
                            <h2>Learning Goals</h2>
                            {this.state.profile.goals.length ? (
									
                                    <div> 
                                       {this.state.profile.goals.slice(0).reverse().map(goal => (
                                           // <li key={goal._id}>
                                            //    <Link to={"/learninggoal/" + goal._id}>
                                                   <GoalCard key={goal._id} goalId={goal._id} category={goal.category} goal={goal.goal} due_date={goal.due_date} />
                                            //    </Link>
                                           // </li>
                                       ))}
                                    </div>
                                   
                               ) : (
                                       <GoalPanelMessage message='Looks like you need to create some learning goals!' />
                                   )}

                            </GoalPanel>
                        </Col>
                        <Col md={9} sm={12}>
                            <div className='learningGoalContainer'>
                                <Row>
                                    <Col sm={12}>
                                        <div className='learningGoalInfo'>
                                            <h2>Goal Category: {this.state.goal.category}</h2>
                                            <p><span>My Goal: </span> {this.state.goal.goal}</p>
                                            <p><span>Measurement: </span>{this.state.goal.measurement}</p>
                                            <p><span>Barriers: </span>{this.state.goal.barriers}</p>
                                            <p><span>Created Date: </span>{moment(this.state.goal.createdAt).format("dddd, MMMM, D, YYYY")}</p>
                                            <p><span>Total Study Hours Scheduled So Far: </span></p>
                                            <p><span>Total Study Hours Completed: </span></p>

                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm={6}>
                                        <div className='pastSessionsDiv'>
                                            <h3>Past Study Sessions:</h3>    

                                            {/* {this.getPastEvents.length ? (
                                                this.getPastEvents.map(pastEvent => {
                                                    <p>{pastEvent.topic}</p>
                                                })
                                            ) : ( */}
                                            <div>You have not completed any study sessions for this goal yet!</div>
                                            {/* // )} */}
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                    <div className='upcomingSessionsDiv'>
                                            <h3>Upcoming Study Sessions:</h3>  
                                                
                                                <div className="upcomingEventDiv">
                                                    <p>Study Topics: const, let, and block scoping</p> 
                                                    <p>Date: April 20, 2018 at 11:00 AM</p>
                                                </div>

                                                <div className="upcomingEventDiv">
                                                    <p>Study Topics: Arrow functions and promises</p> 
                                                    <p>Date: April 21, 2018 at 4:00 PM</p>
                                                </div>

                                               {/* {this.getUpcomingEvents.length ? (
                                                this.getUpcomingEvents.map(futureEvent => {
                                                    <p>{futureEvent.topic}</p>
                                                })
                                            ) : (<div>You have no study sessions for this goal scheduled. Get to studying!</div>)} */}

                                        </div>
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

