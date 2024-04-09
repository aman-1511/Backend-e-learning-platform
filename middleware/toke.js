const express = require('express');
const jwt = require('jsonwebtoken');

// Create an Express application
const app = express();

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for authentication and role checking
const authenticateSuperadmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get the token from the Authorization header
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token,'Aryan', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        if (decoded.role !== 'superadmin') {
            return res.status(403).json({ success: false, message: 'Unauthorized access' });
        }
        req.user = decoded;
        next();
    });
};

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    jwt.verify(token, 'Aryan', (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Invalid token' });
        }
        if (decoded.role !== 'user') { // Ensure this matches the role in your token
            return res.status(403).json({ success: false, message: 'Unauthorized access' });
        }
        req.user = decoded;
        next();
    });
};

const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role === role) {
            next();
        } else {
            res.status(403).json({ success: false, message: 'Unauthorized access' });
        }
    };
};module.exports = {authenticateSuperadmin,authenticateUser,checkRole};