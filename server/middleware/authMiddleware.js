const asyncHandler = require('express-async-handler');
const ErrorHandler=require('../config/ErrorHandler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware=asyncHandler( async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }
    if (!token) {
        return next(new ErrorHandler("Not authorized",401));
    }
});

module.exports = authMiddleware;
