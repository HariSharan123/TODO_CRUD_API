const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema defintion for todo(Ex. Course schema)
const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxlength: 50
    },
    price: {
        type: Number,
        required: true,
        maxlength: 6,
        default: 0
    },
    desciption: {
        type: String,
        maxlength: 500
    },
    image: {
        type: String,
        maxlength: 100
    }
}, { timestamps: true });
module.exports = mongoose.model('todo', todoSchema);