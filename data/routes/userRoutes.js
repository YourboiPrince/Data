const express = require('express');
const routes = express.Router();
const user=require('../models/userModels')
const userController = require('../controller/userController');

// Define routes for user-related operations



routes.get('/user/:id', userController.GetUser);
routes.get('/login', userController.login);
routes.get('/refresh', userController.refreshToken);

routes.post('/user', userController.AddUser);

routes.patch('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const update = req.body;
        const options = { new: true };
        // Assuming 'User' model is defined, replace with your user model
        const result = await User.findByIdAndUpdate(id, update, options);
        res.send(result);
    } catch (error) {
        console.error("Error in updating user", error);
        res.status(500).send({ error: 'Internal server error' });
    }
});

// Add the route for token refresh
routes.post('/RefreshToken', userController.refreshToken);

routes.delete('/:id',);

module.exports = routes;
