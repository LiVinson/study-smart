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

    render() {
        return (
            <div>
                <NavbarBoot home={false}/>
                <Grid fluid={true} className="pageContainer">
                <ButtonBar first_name={this.state.profile.first_name} showGoalModal={this.showGoalModal} showSessionModal={this.showSessionModal} viewStudyInvites={this.viewStudyInvites}/>

                    <Row>
                        <Col md={3} sm={12}>
                            <GoalPanel>
                            <h2>Learning Goals</h2>
                            {this.state.profile.goals.length ? (
									
                                    <div> 
                                       {this.state.profile.goals.map(goal => (
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
                                            <h2>Category:{this.state.goal.category}</h2>
                                            <p>Goal: {this.state.goal.goal}</p>
                                            <p>Measurement:{this.state.goal.measurement}</p>
                                            <p>Barriers:{this.state.goal.barriers}</p>
                                            <p>Created Date:{moment(this.state.goal.createdAt).format("dddd, MMMM, D, YYYY")}</p>
                                            <p>Study Hours Completed So Far:</p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col sm={6}>
                                        <div>
                                            Past Study Sessions        
                                        </div>
                                    </Col>
                                    <Col sm={6}>
                                        <div>
                                            Upcoming Study Sessions        
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

