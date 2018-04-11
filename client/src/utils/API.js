import axios from "axios";

export default {
    //PROFILE
    createLearnerProfile: (profileData) => {
        console.log("inside of API createLearner (before)", profileData)
        return (axios.post(`api/profile/`, profileData))
    },

    getLearnerProfile: (userId) => {
        return (axios.get(`api/profile/${userId}`))
    },

    //GOAL
    createGoal: (goalData, userId) => {

        console.log(goalData);
        return (axios.post(`api/goal/${userId}`, goalData))
    },

    editGoal: (goalData, userId) => {
        //Determine how to complete patch request

    },
    //STUDY SESSION

    createSession: (sessionData, userId) => {
        console.log("studySession object, before sending to port", sessionData);
        return (axios.post(`api/studysession/${userId}`, sessionData))
    },

    editSession: (goalData, userId) => {
        //Determine how to complete patch request
    },
}