import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import axios from 'axios';

// import SignIn from "./components/SignIn";
// import SignUp from "./components/SignUp";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";

class App extends Component {
  state = {
    username: "",
    password: "",
    auth: {
      userId:"",
      username:"",
      isAuthenticated:false
    }
  };

  componentWillMount(){
    axios.get("/auth/isAuthenticated").then((result)=>{
      const {userId, isAuthenticated,username} = result.data
      this.setState({
        auth:{
          userId,
          isAuthenticated,
          username
        }
      });
    });
  }

  handleChange = (event) => {
    const {name, value} = event.target;    
        // Set the state for the appropriate input field
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
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
    const {name} = event.target;
    axios.post(name, newUser).then((data) => {
      if (data.data.isAuthenticated){
        const {userId, isAuthenticated,username} = data.data;
        this.setState({
          auth:{
            userId,
            isAuthenticated,
            username
          }
        });
      }
    });
  }

  handleLogout = (event) => {
    event.preventDefault();
    axios.get("/auth/logout").then((result)=>{
      this.setState({
        auth:{
          userId: "",
          username: "",
          isAuthenticated: false
        }
      });
    })
  };

  render() {
    const loggedIn = this.state.auth.isAuthenticated;
    return (
      <Router>
        <div>
        <Route exact path = "/" render = {()=> {
          if(loggedIn){
            return <Redirect to = "/profile" /> //Change this to "/profile" endpoint (React Endopoint)
          } else{
            return <HomePage //Change this to HomePage Component, which will require in everything needed to render Homepage
              handleChange= {this.handleChange} 
              handleSubmit = {this.handleSubmit}
              username = {this.state.username}
              password = {this.state.password}
            />
          } 
        }}/>
        <Route exact path = "/signup" render = {()=> {
          if(loggedIn){
            return <Redirect to = "/profile" />
          } else{
            return <HomePage 
              handleChange= {this.handleChange} 
              handleSubmit = {this.handleSubmit}
              username = {this.state.username}
              password = {this.state.password}
            />
          }  
        }}/>
        <Route exact path = "/profile" render = {()=> {
          if(!loggedIn){
            return <Redirect to = "/" />
          } else {
            return <Profile handleLogout = {this.handleLogout} auth = { this.state.auth }/>
          } 
        }
        }/>
        </div>
      </Router>
    );
  }
}

export default App;