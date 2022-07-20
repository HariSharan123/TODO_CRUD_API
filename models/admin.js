const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            maxLength: 50,
            validate: {
                validator: function(v) {
                  return /(^$|^.*@.*\..*$)/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            },
        },
        password: {
            type: String,
            required: true,
            maxLength: 200
        }
    }, { timestamps: true })

module.exports = mongoose.model("admin", adminSchema);



