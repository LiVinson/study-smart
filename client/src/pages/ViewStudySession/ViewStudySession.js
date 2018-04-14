import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ViewStudySession.css';
// import NavbarBoot from '../../components/NavbarBoot';
// import ButtonBar from '../../components/ButtonBar';
// import { Grid, Row, Col } from 'react-bootstrap';
// import GoalPanel from '../../components/GoalPanel';
import API from '../../utils/API';

class ViewStudySession extends Component {
    state = {
        profile: {},
        session: {}
    };

    componentDidMount() {
        console.log("userId before API method:", this.props.auth.userId);
        console.log("session before API methods:", this.props.match.match.params.sessionId);
        API.getLearnerProfile(this.props.auth.userId).then(response => {
            console.log("profile -", response.data);
            this.setState({
                profile: response.data
            })
        })
            .then(() => {
                console.log("goalId:", this.props.match.match.params.id)
                API.getSession(this.props.match.match.params.sessionId)
                    .then(res => this.setState({ session: res.data }))
                    .catch(err => console.log(err));

            })
    };

    render() {
        return (
            <h1>THe View Study Session Page</h1>
        )

    }
}


