import axios from "axios";

export default  {

    createLearnerProfile: (profileData) => {
        console.log("inside of API createLearner (before)", profileData)
        return (axios.post(`api/profile/`, profileData))
    },
    
    getLearnerProfile: (userId) => {
        return (axios.get(`api/profile/${userId}`))
    },




}