
//exposts a function that takes in 2 parameters: the passport NPM and the User model from db
module.exports = (passport,User) =>{

    passport.use(User.createStrategy());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};