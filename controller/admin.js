const Admin = require('../models/Admin');
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.signup = async (req, res, next) => {
    try {
        if (errorHandler.validate(['email', 'password'], req.body)) {
            return errorHandler.createError(1003);
        }
        let { email, password } = req.body;
        let admin = await Admin.findOne({ email: email })
        if (admin) {
            return apiResponder(req, res, next, true, 2002, {});
        }
        password = await bcrypt.hash(password, 10)
        await Admin.create({email, password});
        return apiResponder(req, res, next, true, 2001, {});
    } catch (error) {
        next(error);
    }
}

exports.login = async (req, res, next) => {
    try {
        if (errorHandler.validate(['email', 'password'], req.body)) {
            return errorHandler.createError(1003);
        }
        const { email, password } = req.body;
        let admin = await Admin.findOne({ email })
        if (!admin) {
            return apiResponder(req, res, next, true, 2003, {});
        }
        const match = await bcrypt.compare(password, admin.password)
        if (!match) {
            return apiResponder(req, res, next, true, 2003, {});
        }
        let token = jwt.sign({
            id: admin._id,
            type: 'admin'
        }, process.env.JWT_SECRET_KEY, { expiresIn: '365d' });
        let data = {
            token: token,
            id: admin._id
        }
        return apiResponder(req, res, next, true, 2000, data);
    } catch (error) {
        next(error)
    }
}



