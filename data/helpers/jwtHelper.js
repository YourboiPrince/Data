const JWT = require('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/userModels');

module.exports = {
    signAccessToken: (UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options = {
                expiresIn: '2m', // 2 min
                issuer: 'EddTechnologies.com',
                audience: UserId,
            };
            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(new createError.InternalServerError()); // Use 'new' here
                }
                resolve(token);
            });
        });
    },

    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return next(createError.Unauthorized())
            }
            req.payload = payload;
            next()
    })
    },

    signRefreshToken: (UserId) => {
        return new Promise((resolve, reject) => {
            const payload = {};
            const secret = process.env.REFRESH_TOKEN_SECRET;
            const options = {
                expiresIn: '1y', // 1 year
                issuer: 'EddTechnologies.com',
                audience: UserId,
            };
            JWT.sign(payload, secret, options, (error, token) => {
                if (error) {
                    console.log(error.message);
                    reject(new createError.InternalServerError()); // Use 'new' here
                }
                resolve(token);
            });
        });
    }
};
