import axios from "axios";

export default {

    createLearnerProfile: (profileData) => {
        console.log("inside of API createLearner (before)", profileData)
        return (axios.post(`api/profile/`, profileData))
    },

    getLearnerProfile: (userId) => {
        return (axios.get(`api/profile/${userId}`))
    },

    createGoal: (goalData, userId) => {

        console.log(goalData);
        return (axios.post(`api/goal/${userId}`, goalData))
    },

    editGoal: (goalData, userId) => {
        //Determine how to complete patch request

    },

    createSession: (sessionData, userId) => {
        console.log(sessionData);
        return (axios.post(`api/session/${userId}`, sessionData))
    },

    editSession: (goalData, userId) => {
        //Determine how to complete patch request
    },
}