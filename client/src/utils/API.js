import axios from "axios";

export default {
//PROFILE
    createLearnerProfile: (profileData) => {
        return (axios.post(`/api/profile/`, profileData))
    },

    getLearnerProfile: (userId) => {
        return (axios.get(`/api/profile/${userId}`))
    },

    editLearnerProfile: (profileData, userId) => {
        return (axios.patch(`/api/profile/${userId}`, profileData))
    },

//GOALS
    createGoal: (goalData, userId) => {
        return (axios.post(`/api/goal/${userId}`, goalData))
    },

    getGoal: (goalId) =>{
        return (axios.get(`/api/goal/${goalId}`))
    },

    editGoal: (goalData, userId) => {
        //ACTION - Determine how to complete patch request - mimic editProfile

    },

//STUDY SESSIONS
    createSession: (sessionData) => {
        return (axios.post(`/api/studysession/`, sessionData))
    },

    getSession: (sessionId) => {
        return (axios.get(`api/studysession/${sessionId}`))
    },

    editSession: (goalData, userId) => {
        //Determine how to complete patch request - mimic editProfile
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

    sendSessionInvitation: (userId, invitedSessionDetails) =>{
        console.log("invitee userID and invite Data", userId, invitedSessionDetails);
        return (axios.post(`/api/invite/${userId}`, invitedSessionDetails))
    },




}