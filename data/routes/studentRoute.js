const express = require('express');
const routes = express.Router();
// const students = require('../models/studentModels');
const studentController = require('../controller/studentController');
const {verifyAccessToken} = require('../helpers/jwtHelper')
// const students = require('./models/studentModels'); // Update the relative path

routes.get('/students', verifyAccessToken, studentController.getAllStudent);
// Get a list of students from the database{ getting all users}
routes.get('/students/:id', verifyAccessToken, studentController.getStudent);

// Add a student to the database
routes.post('/students', studentController.AddStudent);

// Update a student in the database{patch request}
routes.put('/students/:id', verifyAccessToken, studentController.updateStudent);

// Delete a student from the database
routes.delete('/students/:id', verifyAccessToken, studentController.deleteStudent);

module.exports = routes;
