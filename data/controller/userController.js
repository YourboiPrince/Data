const User =require('../models/userModels');
const CreateError =require('http-errors');
const mongoose = require('mongoose');
const {authSchema} = require("../auth/auth_Schema");
const {signAccessToken, signRefreshToken, verifyAccessToken} = require('../helpers/jwtHelper')



module.exports = {
  AddUser:async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const result = await authSchema.validateAsync(req.body);

      const Exists = await User.findOne({email: email});

      if(Exists) throw CreateError.Conflict(`${email} is already been registered`)
      const user= new User(result)

      const savedUser = await user.save()
      const accessToken = await signAccessToken(savedUser.id)

      res.send({accessToken});
    } catch (error) {
      // if(error.isJoi === true)error.status = 422
      console.log(error.message)
    }
  },

  GetUser: async (req, res, next) => { // Correct the function name to 'GetStudents'
    const id =req.params.id;
    try {
      const user = await User.findById(id); // Correct the variable name 'students'
      if(!user){
        throw(CreateError(404, "user does not exist"))
      }
      res.send(user);
    } catch (error) {
      console.error(error.message);
      if(error instanceof mongoose.CastError){
        next(CreateError(400, "Invalid user id"));
        return;
      }
      // res.status(500).json({ error: 'An error occurred' });
      next(error);
    }
  },

  UpdateUser: async (req, res ,) => {
    try {
      const id = req.params.id;
      const update = req.body;
      const options = { new: true };
      const result = await User.findByIdAndUpdate(id, update, options); // Correct the method name 'findByIdAndUpdate'
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  },
  RemoveUser:async(req, res , next) => {
    const id = req.params.id
    try{
      const user =await User.findByIdAndRemove(id);
      if(!user){
        throw(CreateError(504, "user does not  exist"))
      }
      res.send(user);
    }catch(error){
      console.log(error.message)
      if(error instanceof mongoose.CastError){
        next(CreateError(500, "Invalid user id"))
        return;
      }
      next(error);
    }
  },
  
login: async (req, res, next) => {
  try {
    const result = await authSchema.validateAsync(req.body);
    const user = await User.findOne({email: result.email});
    if(!user) throw CreateError.NotFound('User not Registered');

    const isMatch = await user.isValidPassword(result.password);
    if (!isMatch) throw CreateError.Unauthorized("Incorrect Username/Password");

    const accessToken = await signAccessToken(user.id);
    const refreshToken = await signRefreshToken(user.id);
    // res.send(result);
    res.send({ accessToken, refreshToken });
  } catch (error) {
    if(error.isJoi === true) return next(CreateError.BadRequest('Invalid username/password'));
    next(error);
  }
},

refreshToken: async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if(!refreshToken)throw CreateError.BadRequest();
    const userId =  await verifyRefreshToken(refreshToken);

    const accessToken = await signAccessToken(userId);
    const refToken = await signRefreshToken(userId);
    res.send({accessToken:accessToken, refreshToken:refToken});
  } catch (error) {
    next(error);
  }
}

};



