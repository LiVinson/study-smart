import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ViewLearningGoal.css';
import NavbarBoot from '../../components/NavbarBoot';
import ButtonBar from '../../components/ButtonBar';
import { Grid, Row, Col } from 'react-bootstrap';
import GoalPanel from '../../components/GoalPanel';

class ViewLearningGoal extends Component {
    state = {
        goal: ""
    };

    componentDidMount() {
        this.setState({
            goal: this.props.clickedGoal

        })
    };

    render() {
        return (
            <div>
                <NavbarBoot />
                <ButtonBar />
                <Grid fluid={true} className="pageContainer">
                    <Row>
                        <Col sm={3}>
                            <GoalPanel showGoalForm={this.showGoalForm}>

                                {this.state.profile.goals.length ? (
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

