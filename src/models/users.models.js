const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')

const userCollection = 'users'

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
    password: String,
    role: {
        type: String,
        default: 'user'
    }
});

userSchema.plugin(mongoosePaginate)

const usersModel = model(userCollection, userSchema);

module.exports = {
    usersModel
}