const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true
    },
    last_name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    gener: String
});

const usersModel = model('users', userSchema);

module.exports = {
    usersModel
}