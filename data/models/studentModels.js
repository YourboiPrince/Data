const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
// Updated the variable name to match the module name

const studentSchema = new Schema({
    first_name:{
        type:String,
        required:[true, 'First_name is required']
    },
    last_name:{
        type:String,
        required:[true, 'Last_name is required']
    },
    gender:{
        type:String,
        // required:[true, 'password is required']
    },
 
});

const Student = mongoose.model('student' , studentSchema);
module.exports = Student;