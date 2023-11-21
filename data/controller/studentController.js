const Student = require('../models/studentModels');
const mongoose = require("mongoose");
const createError = require('http-errors'); // Use http-errors instead of createerror
const { signAccesToken} = require('../helpers/jwtHelper')
const AddStudent = async (req, res, next) => {
    try {
        const student = new Student(req.body);
        const result = await student.save();
        res.send(result);
    } catch (error) {
        console.error("Error in adding student");
        if (error.name === "ValidationError") {
            next(createError(422, error.message));
            return;
        }
        next(error);
    }
    
};
const getAllStudent = async (req, res, next) => {
  try {
      const student = await Student.find({});
      res.send(student)

      // if (!student) {
      //     throw createError(404, 'No such student exists');
      // }

      // res.send(student);
  } catch (error) {
      console.error(error.message);
      next(error);
  }
}

const getStudent = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            // Check if the provided ID is not a valid ObjectId
            return next(createError(400, 'Invalid student Id'));
        }

        const student = await Student.findById(id);

        if (!student) {
            throw createError(404, 'No such student exists');
        }

        res.send(student);
    } catch (error) {
        console.error(error.message);
        next(error);
    }
};

const deleteStudent = async (req, res) => {
    try {
      const id = req.params.id;
      // Implement code to delete the student from the database using the 'id'
      // ...
      res.status(204).send(); // Respond with a 204 status code for successful deletion
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'An error occurred' });
    }
  };  

  const updateStudent = async (req, res) => {
    try {
      const id = req.params.id;
      const update = req.body;
  
      // Check if the 'update' object is empty
      if (Object.keys(update).length === 0) {
        return res.status(400).json({ error: 'No fields to update provided' });
      }
  
      // Use findByIdAndUpdate to update the student by ID
      const updatedStudent = await Student.findByIdAndUpdate(id, update, { new: true });
  
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json(updatedStudent);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = {
    AddStudent,
    getStudent,
    deleteStudent,
    updateStudent,
    getAllStudent
};
