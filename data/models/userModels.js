const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    email:{
        type:String,
        required:[true, 'email is required'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'password required']
    }
    // email:{
    //     type:String,
    //     required:[true, 'Email is required'],
    //     unique:true
    // },
});
// hashing the pwd b4 saving in the DB
// this function will be called b4 saving the user
userSchema.pre('save', async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(this.password, salt)
        this.password=hashedPwd
        next()
    } catch (error) {
      next(error)  
    }
});

userSchema.methods.isValidPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}

const User = mongoose.model('user' ,userSchema);
module.exports =User;