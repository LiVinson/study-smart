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
       return (axios.post(`/api/studyresource/${sessionId}`, resource))
    },

    //STUDY BUDDY INVITATIONS
    checkEmailExists: (userEmail) => {
        return (axios.get(`/api/buddyId/${userEmail}`))

    },

    sendSessionInvitation: (invitedSessionDetails) =>{
        return (axios.post(`/api/inviteUser`, invitedSessionDetails))
    }
}