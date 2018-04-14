import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ViewLearningGoal.css';
import NavbarBoot from '../../components/NavbarBoot';
import ButtonBar from '../../components/ButtonBar';
import { Grid, Row, Col } from 'react-bootstrap';
import GoalPanel from '../../components/GoalPanel';
import API from '../../utils/API';

class ViewLearningGoal extends Component {
    state = {
        profile: {},
        goal: {}
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
            console.log("goalId:", this.props.match.match.params.id)
            API.getGoal(this.props.match.match.params.goalId)
            .then(res => this.setState({ goal: res.data }))
            .catch(err => console.log(err));

        })
    };

    render() {
        return (
            <div>
                <NavbarBoot home={false}/>
                <ButtonBar />
                <Grid fluid={true} className="pageContainer">
                    <Row>
                        <Col sm={3}>
                            <GoalPanel showGoalForm={this.showGoalForm}>

                                {this.state.profile ? (
                                    <p>list of learning goals</p>
                                ) : (
                                        <div message='Looks like you need to create some learning goals!' />
                                    )}

                            </GoalPanel>
                        </Col>
                        <Col sm={9}>
                            <Row>
                                <Col sm={12}>
                                    <div>
                                        Information on this learning goal
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
                        </Col>
                    </Row>
                </Grid>
            </div>
        )
    }
};

export default ViewLearningGoal;

