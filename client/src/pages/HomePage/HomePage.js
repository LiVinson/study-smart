import React from 'react';
import './Homepage.css';
import NavbarBoot from '../../components/NavbarBoot';
import JumbotronBoot from '../../components/JumbotronBoot';
import { Grid, Row, Col } from 'react-bootstrap';

// import { myTabs } from '../../components/Tab';
import { Tabs, Tab } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import Footer from '../../components/Footer';

const HomePage = props => {

	return (
		<div>
			<NavbarBoot home={true} />
			<JumbotronBoot />
			<Grid>
				<Row>
					<Col xs={12} sm={7}>

						<div>
							<h3>Why Study SMART?</h3>
								<p>
									Even for the best students, finding time to study can be hard. But we all have the same 24 hours, and planning your studying ahead of time 
									will help even the biggest procrastinators stick to a schedule and meet their SMART goals:

								</p>
							<br />
								<p>
									<span>Specific:</span> State exactly what you are aiming to learn, and see it every time you log in.
								</p>
							
								<p>
									<span>Measurable:</span> Set a marker of what you will be able to do, so you know when you have acheived your goal.
								</p>
								<p>
									<span>Attainable</span>: Based on the time and effort required, make sure your learning goal is actually acheivable for you in the timeframe you set.
								</p>
								<p>
									<span>Realistic:</span> Set learning goals that can be attained, keeping you motivated to learn even more.
								</p>
								<p>
									<span>Timebound:</span> Give yourself a deadline. A goal without a due date is just a wish.
								</p>
						</div>
					</Col>
					<Col xs={12} sm={5}>
						<Tabs defaultActiveKey={1} animation={true} id="Signup">

							<Tab eventKey={1} title="Sign Up">
							<SignUp
									handleChange={props.handleChange}
									handleSubmit={props.handleSubmit}
									username={props.username}
									password={props.password}
								/>

							</Tab>
							<Tab eventKey={2} title="Sign In">
								<SignIn
									handleChange={props.handleChange}
									handleSubmit={props.handleSubmit}
									username={props.username}
									password={props.password}
								/>
							</Tab>
						</Tabs>
					</Col>
				</Row>
			</Grid>
			<Footer/>

		</div>
	)
};

export default HomePage;