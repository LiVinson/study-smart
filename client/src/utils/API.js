import axios from "axios";

export default {
//PROFILE
    createLearnerProfile: (profileData) => {
        console.log("inside of API createLearner (before)", profileData)
        return (axios.post(`/api/profile/`, profileData))
    },

    getLearnerProfile: (userId) => {
        return (axios.get(`/api/profile/${userId}`))
    },

    editLearnerProfile: (profileData, userId) => {
        console.log("inside of API editLearnerProfile", profileData)
        return (axios.patch(`/api/profile/${userId}`, profileData))

    },

//GOALS
    createGoal: (goalData, userId) => {

        console.log(goalData);
        return (axios.post(`/api/goal/${userId}`, goalData))
    },

    getGoal: (goalId) =>{
        console.log(goalId)
        return (axios.get(`/api/goal/${goalId}`))
    },

    editGoal: (goalData, userId) => {
        //Determine how to complete patch request

    },

//STUDY SESSIONS
    createSession: (sessionData, userId) => {
        console.log("studySession object, before sending to port", sessionData);
        // sessionData.start = sessionData.start.format();
        // console.log(sessionData.start);
        return (axios.post(`/api/studysession/${userId}`, sessionData))
    },

    getSession: (sessionId) => {
        console.log(sessionId)
        return (axios.get(`api/studysession/${sessionId}`))
    },

    editSession: (goalData, userId) => {
        //Determine how to complete patch request
    },

    addSessionResource: (resource, sessionId) => {
        console.log("resource and sessionId inside of API.addSessionResource", resource, sessionId)
        return (axios.post(`/api/studyresource/${sessionId}`, resource))

    },

    //STUDY BUDDY INVITATIONS
    checkEmailExists: (userEmail) => {
        console.log("API.checkEmailExists - email before GET", userEmail);
        return (axios.get(`/api/buddyId/${userEmail}`))

    },

    sendSessionInvitation: (userId, inviteData) =>{
        console.log("invitee userID and invite Data", userId, inviteData);
        return (axios.post(`/api/invite/${userId}`, inviteData))
    },




}