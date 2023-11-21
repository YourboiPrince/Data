const express = require('express');
require('dotenv').config();
const cors = require('cors');
require('../../data/data/helpers/init_mongodb');
const studentRoutes = require('./routes/studentRoute');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' })); // Enable CORS for all routes

app.use(express.json());
app.use(studentRoutes);
app.use(userRoutes);

// Handle 404 Not Found
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
        message: err.message
    });
});

const port = process.env.PORT || 4001;

app.listen(port, () => {
    console.log('Now listening for requests on: http://localhost:' + port);
});
