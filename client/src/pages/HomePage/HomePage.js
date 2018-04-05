import React from 'react';
import './style.css';
import NavbarBoot from '../../components/NavbarBoot';
import JumbotronBoot from '../../components/JumbotronBoot';
import { Grid, Row, Col } from 'react-bootstrap';

// import { myTabs } from '../../components/Tab';
import { Tabs, Tab } from 'react-bootstrap';

// import { Link } from 'react-router-dom';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';

const HomePage = (props) => {

	return (
		<div>
			<NavbarBoot />
			<JumbotronBoot />
			<Grid>
				<Row>
					<Col xs={12} sm={6}>

						<div>
							<h3>Some Information About the Website</h3>
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod mi id massa cursus, eget fringilla neque ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut quis convallis lorem, eget interdum ex. Integer fermentum scelerisque consequat.
							</p>
							<br />
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod mi id massa cursus, eget fringilla neque ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut quis convallis lorem, eget interdum ex. Integer fermentum scelerisque consequat.
							</p>
							<br />
							<p>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent euismod mi id massa cursus, eget fringilla neque ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut quis convallis lorem, eget interdum ex. Integer fermentum scelerisque consequat.
							</p><br />
						</div>
					</Col>
					<Col xs={12} sm={6}>
						<Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">

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

		</div>
	)
};

export default HomePage;