import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
// import NavbarBoot from './components/NavbarBoot';
// import ButtonBar from './components/ButtonBar';
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import ViewLearningGoal from "./pages/ViewLearningGoal";
import API from "./utils/API";
import moment from "moment";

//CURRENT TEST ACCOUNT: email30@email.com, password

class App extends Component {
  state = {
    username: "",
    password: "",
    auth: {
      userId: "",
      username: "",
      isAuthenticated: false
    },
    firstLogin: false,
    profile: { //Pass down as prop to LG and Profile
      first_name: "",
			last_name: "",
			mobile_number: "",
			learner_status: "",
			goals: [],
			sessions: [],
			invitations: []
    },
    editProfile: { //Pass down as prop to LG and Profile
      first_name: "",
			last_name: "",
			mobile_number: "",
			learner_status: ""
    },
    viewProfile:true,
    newGoal: {
			category: "",
			due_date: moment(),
			// goalId: "",
			measurement: "",
			barriers: "",
		},
		newSession: {
			goalId: "",
			// owner: this.props.auth.userId,
			owner_name: "",
			title: "",
			start: moment(),
			duration_hours: 0,
			duration_minutes: 0,
			location: "",
		},
    modalToggle: {
        profileModal: false,
        goalModal: false,
        sessionModal: false,
        sessionDetailModal: false
    }


  };
  
  componentWillMount() {
    axios.get("/auth/isAuthenticated").then(result => {
      const { userId, isAuthenticated, username } = result.data;
      this.setState({
        auth: {
          userId,
          isAuthenticated,
          username
        }
      });
    });
  };

  handleChange = event => {
    const { name, value } = event.target;
    // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    //call a sign In function
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };
    this.setState({
      username: "",
      password: ""
    });
    const { name } = event.target;
    axios.post(name, newUser).then(data => {
      if (data.data.isAuthenticated) {
        const { userId, isAuthenticated, username } = data.data;
        this.setState({
          auth: {
            userId,
            isAuthenticated,
            username
          }
        });
      }
    });
  }

  handleLogout = event => {
    event.preventDefault();
    axios.get("/auth/logout").then(result => {
      this.setState({
        auth: {
          userId: "",
          username: "",
          isAuthenticated: false
        }
      });
    })
  };

    //Add duplicated functions in Profile and Learning Goal page here
  
  //CREATING, VIEWING, AND EDITING USER PROFILE

  getProfile = this.getProfile.bind(this);    //Check if user has profile and store in state, otherwise set firstLogin to true - Profile form modal will appear
    getProfile() { //Pass down as prop to Profile and View Learning Goal pages
      console.log("this inside getProfile", this);
      API.getLearnerProfile(this.state.auth.userId).then(response => {
        console.log("response from API.getLearnerProfile", response.data);
  
        if (response.data) {
                this.setState({
                  profile: response.data,
                  viewProfile: true
               })
        } else {
          this.setState({
            firstLogin:true
          })
        }
      })
    };

    profileCreated = () => {
      this.setState({
        firstLogin: false
      })
    }
    handleProfileInputChange = event => {
      console.log("handle profile input change");
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
    //Called when View Profile button in Navbar clicked. Toggles showing profile and profile form to edit user profile
    toggleProfileModal = () => {
      const modalToggle = Object.assign({}, this.state.modalToggle)

      //If modal is not showing, copy the profile data into editProfile, and save in state; show profile modal
      if (!this.state.modalToggle.profileModal) {//If modal is not showing
        const editProfile = Object.assign({}, this.state.editProfile);
        editProfile.first_name = this.state.profile.first_name;
        editProfile.last_name = this.state.profile.last_name;
        editProfile.mobile_number = this.state.profile.mobile_number;
        editProfile.learner_status = this.state.profile.learner_status;
        
        modalToggle.profileModal = true;
        
        this.setState({
          modalToggle: modalToggle,
          viewProfile: true,
          editProfile: editProfile
        })
      }
      else {
        modalToggle.profileModal = false;

        this.setState({
          modalToggle: modalToggle,
          viewProfile: true
        })
      }
    };

    //Called When user is viewing profile, and clicks edit profile button
    editProfileFormClicked = () => {
      console.log("edit profile clicked");
        this.setState({
        viewProfile: false,
      })
    };

      //Called when user has clicks to Save Changes to profile
    saveProfileEdits = () => {
      console.log("you have requested to edit your profile");
      const profile = this.state.editProfile;
      const userId = this.state.auth.userId
      console.log("new profile data:", profile);
      API.editLearnerProfile(profile, userId).then(response=> {
        console.log(response.data);
        this.getProfile()
        })

    };

//USER GOALS

//Goal Form Input (all except date)
	handleGoalInputChange = event => {  //Pass down to Profile and LG as prop
		const { name, value } = event.target;
		const newGoal = Object.assign({}, this.state.newGoal);
		newGoal[name] = value;
		this.setState({
			newGoal: newGoal
		})
	};

	//Goal form input - date
	handleGoalDate = date => { //Pass down to Profile and LG as prop
		const newGoal = Object.assign({}, this.state.newGoal);
		newGoal.due_date = date;
		this.setState({
			newGoal: newGoal
		})
	};

	//Goal form submission 
	createGoalSubmit = () => { //Pass down to Profile and LG as prop
		console.log("you've created a goal!");
		const goal = Object.assign({}, this.state.newGoal);

		API.createGoal(goal, this.state.auth.userId).then(response => {
      console.log("response back from creating goal - should be profile:", response.data);
      const modalToggle = Object.assign({}, this.state.modalToggle)
      modalToggle.goalModal = false;
			this.setState({
        modalToggle: modalToggle,
        profile: response.data
			});
			
		})
  };
  

  //CREATE NEW STUDY SESSION FORM

	handleSessionInputChange = event => {//Pass down to profile and LG as prop
		// console.log(event.target);
		const { name, value } = event.target;
		const newSession = Object.assign({}, this.state.newSession);
		newSession[name] = value;
		this.setState({
			newSession: newSession
		})
	};

	handleStartChange = date => { //Pass down to profile and LG as prop
		console.log(date);
		const newSession = Object.assign({}, this.state.newSession);
		newSession.start = date;
		this.setState({
			newSession: newSession
		});
	};

	createSessionSubmit = () => { //Pass down to profile and LG as prop
    console.log("createSessionSubmit!");
    API.createSession(this.state.newSession, this.state.auth.userId)
			.then((response) => {
				console.log(response.data);
				this.hideSessionModal();
        this.getProfile();
			})
	};


//MODAL CONTROLS

showGoalModal = () => {
  const modalToggle = Object.assign({}, this.state.modalToggle)
  modalToggle.goalModal = true;
  this.setState({
    modalToggle: modalToggle
  })
};

hideGoalModal = () => {
  console.log("hide goal modal");
  const newGoal = { ...this.state.newGoal, category: "", due_date: moment(), measurement: "", barriers: "" };
  const modalToggle = Object.assign({}, this.state.modalToggle)
  modalToggle.goalModal = false;
  this.setState({
    modalToggle: modalToggle,
    newGoal: newGoal
  });
};

showSessionModal = () => {
  console.log("'this' inside of showSessionModal", this );
  const modalToggle = Object.assign({}, this.state.modalToggle);
  modalToggle.sessionModal = true;
  this.setState({
    modalToggle: modalToggle
  });

  
  
};

redirectShowSessionModal = ()=> {
    console.log("'this' inside of residirectShowSessionModal:", this)
    const modalToggle = Object.assign({}, this.state.modalToggle)
    modalToggle.sessionModal = true;  
    this.setState({
      modalToggle: modalToggle
    })
}

hideSessionModal = () => {
  const newSession = { ...this.state.newSession, goalId: "", title: "", location: "", start: moment(), end: moment() };
  const modalToggle = Object.assign({}, this.state.modalToggle)
  modalToggle.sessionModal = false;
  this.setState({
    modalToggle:modalToggle,
    newSession: newSession
  })
};

    //----------------
  render() {
    const loggedIn = this.state.auth.isAuthenticated;
    return (
      //Add navbar and button bar component (if logged in)
      <Router>
        <div>
          <Route exact path="/" render={() => {
            if (loggedIn) {
              return <Redirect to="/profile" /> //Change this to "/profile" endpoint (React Endopoint)
            } else {
              return <HomePage //Change this to HomePage Component, which will require in everything needed to render Homepage
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                username={this.state.username}
                password={this.state.password}
              />
            }
          }} />
          <Route exact path="/signup" render={() => {
            if (loggedIn) {
              return <Redirect to="/profile" />
            } else {
              return <HomePage
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                username={this.state.username}
                password={this.state.password}
              />
            }
          }} />
          <Route exact path="/profile" render={() => {
            if (!loggedIn) {
              return <Redirect to="/" />
            } else {
              return <Profile 
                handleLogout={this.handleLogout} 
                auth={this.state.auth} 
                //add additional functions needed
                profile={this.state.profile}
                firstLogin={this.state.firstLogin}
                getProfile={this.getProfile}
                profileCreated={this.profileCreated}
                viewProfile={this.state.viewProfile}
                editProfileFormClicked={this.editProfileFormClicked}
                editProfile={this.state.editProfile}
                handleProfileInputChange={this.handleProfileInputChange}
                toggleProfileModal={this.toggleProfileModal}
                saveProfileEdits={this.saveProfileEdits}
                newGoal={this.state.newGoal}
                handleGoalInputChange={this.handleGoalInputChange}
                handleGoalDate={this.handleGoalDate} 
                createGoalSubmit={this.createGoalSubmit}
                newSession={this.state.newSession}
                handleSessionInputChange={this.handleSessionInputChange}
                handleStartChange={this.handleStartChange}
                createSessionSubmit={this.createSessionSubmit}
                showSessionModal={this.showSessionModal}
                hideSessionModal={this.hideSessionModal}
                showGoalModal={this.showGoalModal}
                hideGoalModal={this.hideGoalModal}
                modalToggle={this.state.modalToggle}
                />
            }
          }
          } />
          <Route exact path="/learninggoal/:goalId" render={(renderProps) => {
            if (!loggedIn) {
              return <Redirect to="/" />
            } else {
              return <ViewLearningGoal 
                profile={this.state.profile}
                getProfile={this.getProfile}
                goalData={renderProps} 
                handleLogout={this.handleLogout}
                auth={this.state.auth}
                handleProfileInputChange={this.handleProfileInputChange}
                handleGoalInputChange={this.handleGoalInputChange}
                handleGoalDate={this.handleGoalDate} 
                createGoalSubmit={this.createGoalSubmit}
                newGoal={this.state.newGoal}
                handleSessionInputChange={this.handleSessionInputChange}
                handleStartChange={this.handleStartChange}
                createSessionSubmit={this.createSessionSubmit}
                newSession={this.state.newSession}
                showSessionModal={this.showSessionModal}
                redirectShowSessionModal={this.redirectShowSessionModal}
                toggleProfileModal = {this.toggleProfileModal}
                editProfileFormClicked={this.editProfileFormClicked}
                saveProfileEdits={this.saveProfileEdits}
                showGoalModal={this.showGoalModal}
                hideGoalModal={this.hideGoalModal}
                hideSessionModal={this.hideSessionModal}

                modalToggle={this.state.modalToggle}


                //add additinal functions needed
                />
            }
          }
          } />

        </div>

      </Router>
    );
  }
}

export default App;