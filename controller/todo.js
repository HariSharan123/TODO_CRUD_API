const ToDo = require('../models/todo');
const apiResponder = require('../utils/responseHandler');
const errorHandler = require('../utils/errorHandler');

exports.add = async (req, res, next) => {
    try {
        if (errorHandler.validate(['title', 'price'], req.body)) {
            return errorHandler.createError(1003);
        }
        let todo = await ToDo.create(req.body);
        return apiResponder(req, res, next, true, 2004, todo);
    }
    catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        if (errorHandler.validate(['id', 'title', 'price'], req.body)) {
            return errorHandler.createError(1003);
        }
        await ToDo.findOneAndUpdate({ _id: req.body.id }, { $set: req.body });
        return apiResponder(req, res, next, true, 2005, await ToDo.findById(req.body.id));
    }
    catch (error) {
        next(error);
    }
}

exports.deleteTodo = async (req, res, next) => {
    try {
        if (errorHandler.validate(['id'], req.params)) {
            return errorHandler.createError(1003);
        }
        let { id } = req.params;
        let todo = await ToDo.findByIdAndDelete(id)
        return apiResponder(req, res, next, true, 2006, todo);
    } catch (error) {
        next(error)
    }
}


exports.getTodos = async (req, res, next) => {
    try {
        if (errorHandler.validate(['offset', 'limit'], req.body)) {
            return errorHandler.createError(1003);
        }
        let {offset, limit} = req.body
        const [todos, total] = await Promise.all([
            ToDo.find().skip(offset).limit(limit).sort('-createdAt'),
            ToDo.countDocuments()
        ])
        return apiResponder(req, res, next, true, 2007, {todos, total});

    } catch (error) {
        next(error);
    }
}

