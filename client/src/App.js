import React, { Component } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
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
    authErrorMessage: "",
    auth: {
      userId: "",
      username: "",
      isAuthenticated: false,
     
    },
    firstLogin: false,
    profile: { //Passed down as prop to LG and Profile to store user profile
      first_name: "",
			last_name: "",
			mobile_number: "",
			learner_status: "",
			goals: [],
			sessions: [],
			invitations: []
    },
    editProfile: { //Pass down as prop to LG and Profile to store profile input when being edited
      first_name: "",
			last_name: "",
			mobile_number: "",
			learner_status: ""
    },
    viewProfile:true, //
    newGoal: { //Goal is stored when user inputs in add goal form
			category: "",
			due_date: moment(),
			measurement: "",
			barriers: "",
		},
		newSession: { //Goal is stored when user inputs in add session form
			goalId: "",
			owner_name: "",
			title: "",
			start: moment(),
			duration_hours: 0,
			duration_minutes: 0,
			location: "",
		},
    modalToggle: { //Controls which modal is displayed
        profileModal: false,
        goalModal: false,
        sessionModal: false,
        sessionDetailModal: false
    }
  };
  
  //  --------------------- USER AUTHENTICATION --------------------------

  componentWillMount = () => {
    // When app mounts, makes GET request - checks if user is authenticated. Receives username and pass value, or Null if not authenticated

    axios.get("/auth/isAuthenticated").then(result => {
      console.log("result from checking for authenication: ", result);
      const { userId, isAuthenticated, username } = result.data;
      this.setState({
        auth: {
          userId,
          isAuthenticated,
          username
        }
      });
    }).catch(err=> {
      console.log("error received back from get request to check if user is authenticated", err);
  })
};


  //  Called when user presses key in input field (various forms)

  handleChange = event => {
    const { name, value } = event.target;
    // Sets the state for the appropriate input field
    this.setState({
      [name]: value,
      
    });
  };

  //ACTION add getEmailValidationState function to ensure email entered is valid 

  getPassValidationState = () => {
      const length = this.state.password.length;
      //ACTION - Add additional validation aside from length, and do not allow submission
      if (length > 4) return 'success';
      else if (length > 0) return 'error';
      return null;
  }
  // Called when user clicks submit onSign Up form   Saves user in object, resets state, and sends post request   to create new user 

  handleSubmit = event => {
    event.preventDefault();
    const newUser = {
      username: this.state.username,
      password: this.state.password
    };
   
    this.setState({
      // username: "",
      password: ""
    });
    const { name } = event.target; //button name is auth/signin or auth/signup

    axios.post(name, newUser).then(data => {
      if (data.data.isAuthenticated) {
        const { userId, isAuthenticated, username } = data.data;
        this.setState({
          authErrorMessage: "",
          username: "",
          auth: {
            userId,
            isAuthenticated,
            username
          }
        });
      }
      else { 
        console.log("what was received back from an unssuccesful authentication post:", data.data);    
        let authErrorText;
        switch (data.data.name) {
          case ("UserExistsError"): 
            authErrorText = "A user with that email address is already signed up. Please double check the email entered or sign in with the correct password";
            break;
          case ("IncorrectPasswordError"): 
            authErrorText = "The email address or password you entered is incorrect. Please try again."
            break;
          case ("IncorrectUsernameError"): 
            authErrorText = "Unable to find your Study Smart account. Please check your email address and try again."
            break;
          default:
            console.log("this was the error message received back: ", data.data.message);
            authErrorText = "There was a problem signing you in. Please try again";
          }
        this.setState({
          authErrorMessage: authErrorText
          })
      }
    }).catch(err => {
      console.log("error message inside catch for signin post request:", err.response);

        });
      };


  // Called when user clicks logout button. Makes GET  request to end login session, resets user data in state

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

 
// ------CREATING, VIEWING, AND EDITING USER PROFILE-----------------------


  /*  Bind current context of this when called in App.getProfile() to the getProfile function s /App will still be the "this" when
   function is called as a prop by other components  */

  getProfile = this.getProfile.bind(this);    
    getProfile() { 
      /*  API method to get the authenticated user's profile from database, store profile in state and set viewProfile true
       (controls if profile data shows when View Profile modal shows, or edit profile form)  */
      API.getLearnerProfile(this.state.auth.userId).then(response => {
        if (response.data) {
                this.setState({
                  profile: response.data,
                  viewProfile: true
               })
        } else {
           /*  If there is no profile for user in the Learner table, how fistLogin true - profile modal with profile form displays  */
          this.setState({
            firstLogin:true
          })
        }
      })
    };


    // Called oncer user submits profile form for first time. Profile modal will be hidden

    profileCreated = () => {
      this.setState({
        firstLogin: false
      })
    }

    //Called when user enters key in Profile form. 
    handleProfileInputChange = event => {
      const { name, value } = event.target;

      /*If user is completing profile form for the first time
      updates state.profile values to match user input in profile.state
      */
      if (this.state.firstLogin) { 
        const profile = Object.assign({}, this.state.profile);
        profile[name] = value;
        this.setState({
          profile: profile
        })
        /*
        If user makes profile edits, save user inputs in profile form in state.editProfile
        so it will not overwrite current profile value (state.profile) until user submits changes
        and updated in the database
        */
      } else {
        const editProfile = Object.assign({}, this.state.editProfile);
        editProfile[name] = value;
        this.setState({
          editProfile: editProfile
        })
      }
    };

    /*Called when View Profile button in Navbar clicked or modal is showing and "Close" btn is clicked.  Toggles showing profile info 
    and profile form to edit user profile*/
    
    toggleProfileModal = () => {
      const modalToggle = Object.assign({}, this.state.modalToggle)

      /*If modal is not showing, copy the profile data into editProfile and save in state (will be displayed in form inputs); show profile modal
      If modal is already showing (called when Close is clicked), toggle modal off. Update viewProfile to display Profile info when modal opens next
      */
      
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


    //  Called When user is viewing profile, and clicks edit profile button. Changes modal contents from profile data to edit profile form
    
    editProfileFormClicked = () => {
        this.setState({
        viewProfile: false,
      })
    };


    //  Called when user clicks Save Changes in edit profile form

    saveProfileEdits = () => {
      /* ACTION - Add check to see if editProfile and profile in state are exactly the same (user made no changes)
      or disable Edit btn until editProfile != profile in state.
      */
      const profile = this.state.editProfile;
      const userId = this.state.auth.userId;

      //API method to sent patch request to edit learner profile in Learner table, then calls method to get updated profile
      API.editLearnerProfile(profile, userId).then(response=> {
        console.log(response.data);
        //ACTION - Instead of calling method again, check above console.log to see if editLearnerProfile returns updated profile object from
        //patch request. If, so see if that is better to use instead of calling this.getProfile method.
        this.getProfile()
        })

    };

//----------------USER GOALS-------------------------------------

//Called when user presses key inside Goal form inputs. Updates state to store input values from form for all except date

	handleGoalInputChange = event => {  
		const { name, value } = event.target;
		const newGoal = Object.assign({}, this.state.newGoal);
		newGoal[name] = value;
		this.setState({
			newGoal: newGoal
		})
  };
  

  // Called when user makes selection inside Goal form date input - updates selected date in state
  
	handleGoalDate = date => { //Pass down to Profile and LG as prop
		const newGoal = Object.assign({}, this.state.newGoal);
		newGoal.due_date = date;
		this.setState({
			newGoal: newGoal
		})
	};


  //  Called when user submits Goal form submission
   
	createGoalSubmit = () => { 
		const goal = Object.assign({}, this.state.newGoal);

    /* API method to send POST request to api/newgoal, receives updated user profile with goal populated in response and updates state of 
    profile and goal modal to be hidden */
		API.createGoal(goal, this.state.auth.userId).then(response => {

      const modalToggle = Object.assign({}, this.state.modalToggle);
      modalToggle.goalModal = false;
			this.setState({
        modalToggle: modalToggle,
        profile: response.data
			});
		})
  };
  

  //  -------------------USER STUDY SESSION -----------------


  //  Called when user updates input inside Study session form. Saves user values in state for all inputs except start date

	handleSessionInputChange = event => {
		const { name, value } = event.target;
		const newSession = Object.assign({}, this.state.newSession);
		newSession[name] = value;
		this.setState({
			newSession: newSession
		})
	};


  //  Called when user updates start date  input inside Study session form. Saves user selection

	handleStartChange = date => { 
		const newSession = Object.assign({}, this.state.newSession);
		newSession.start = date;
		this.setState({
			newSession: newSession
		});
  };
  

  // Called when user clicks create study session in study session form

	createSessionSubmit = () => { 

    /* ACTION - Add validation to ensure all fields are entered, sensical data  Look into disabling submit button until required
     fields entered */

    API.createSession(this.state.newSession, this.state.auth.userId)
			.then(response => {
				this.hideSessionModal();
        this.getProfile();
			})
	};


// ---------------- MODAL CONTROLS -------------------------

// Called when Add Goal navbar button clicked, Hidden when Cancel adding goal, submit goal clicked
showGoalModal = () => {
  const modalToggle = Object.assign({}, this.state.modalToggle)
  modalToggle.goalModal = true;
  this.setState({
    modalToggle: modalToggle
  })
};


// ACTION - Consider merging show/hideGoalModal. Only difference is resetting newGoal value in state - can add conditional

// Called when Cancel btn in Add Goal Form clicked, or after goal submission

hideGoalModal = () => {
  const newGoal = { ...this.state.newGoal, category: "", due_date: moment(), measurement: "", barriers: "" };
  const modalToggle = Object.assign({}, this.state.modalToggle)
  modalToggle.goalModal = false;
  this.setState({
    modalToggle: modalToggle,
    newGoal: newGoal
  });
};


// Called when user clicks Add Study Session

showSessionModal = () => {
  const modalToggle = Object.assign({}, this.state.modalToggle);
  modalToggle.sessionModal = true;
  this.setState({
    modalToggle: modalToggle
  });
};


// Called is user clicks Cancel in study session form. Resets state.newSession values, hides modal

hideSessionModal = () => {
  const newSession = { ...this.state.newSession, goalId: "", title: "", location: "", start: moment(), end: moment() };
  const modalToggle = Object.assign({}, this.state.modalToggle)
  modalToggle.sessionModal = false;
  this.setState({
    modalToggle:modalToggle,
    newSession: newSession
  })
};

    
  render() {
    const loggedIn = this.state.auth.isAuthenticated;
    return (
    //ACTION - Look into adding Navbar and Buttonbar for Profile and Learning Page here (if home, return Navbar 1, if !home
    //return Navbar2 and buttonbar)
      <Router>
        <div>
          <Route exact path="/" render={() => {
            if (loggedIn) { //  At root, if user is authenticated, go to profile url (load profile component)
              return <Redirect to="/profile" /> 
            } else {
              return <HomePage //If user not authenticated, load HomePage component
                authErrorMessage={this.state.authErrorMessage}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                username={this.state.username}
                password={this.state.password}
                getPassValidationState={this.getPassValidationState}
              />
            }
          }} />

          <Route exact path="/profile" render={() => { //If root/profile URL is hit, redired to root if not authenticated, otherwise load Profile component
            if (!loggedIn) {
              return <Redirect to="/" />
            } else {
                return <Profile 
                  auth={this.state.auth} 
                  handleLogout={this.handleLogout} 
                  profile={this.state.profile}
                  firstLogin={this.state.firstLogin}
                  viewProfile={this.state.viewProfile}
                  getProfile={this.getProfile}
                  profileCreated={this.profileCreated}
                  editProfile={this.state.editProfile}
                  editProfileFormClicked={this.editProfileFormClicked}
                  handleProfileInputChange={this.handleProfileInputChange}
                  saveProfileEdits={this.saveProfileEdits}
                  newGoal={this.state.newGoal}
                  handleGoalInputChange={this.handleGoalInputChange}
                  handleGoalDate={this.handleGoalDate} 
                  createGoalSubmit={this.createGoalSubmit}
                  newSession={this.state.newSession}
                  handleSessionInputChange={this.handleSessionInputChange}
                  handleStartChange={this.handleStartChange}
                  createSessionSubmit={this.createSessionSubmit}
                  showGoalModal={this.showGoalModal}
                  hideGoalModal={this.hideGoalModal}
                  showSessionModal={this.showSessionModal}
                  hideSessionModal={this.hideSessionModal}
                  modalToggle={this.state.modalToggle}
                  toggleProfileModal={this.toggleProfileModal}
                />
              }
            }
          } />

          <Route exact path="/learninggoal/:goalId" render={renderProps => { 

             /*When URL of root + learningGoal + goalId is requested, redirect to home if user is not authenticated. 
              Otherwise load View Learning Goal component. Takes in renderProps as parameter - built in with react-router-dom and contains 
              location, history and match data on URL location - used to compare current URL with previous to detect changes*/
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
                toggleProfileModal = {this.toggleProfileModal}
                editProfileFormClicked={this.editProfileFormClicked}
                saveProfileEdits={this.saveProfileEdits}
                showGoalModal={this.showGoalModal}
                hideGoalModal={this.hideGoalModal}
                hideSessionModal={this.hideSessionModal}
                modalToggle={this.state.modalToggle}
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