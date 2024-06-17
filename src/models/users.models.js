const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2')
const { createHash } = require('../utils/bcrypt');

const userCollection = 'users'

const userSchema = new Schema({
    first_name: {
        type: String,
        index: true,
        required: true
    },
    last_name: {
        type: String,
        required: true,
    } ,
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    } ,
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'carts'
    },
    role: {
        type: String,
        default: 'user'
    }
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        try {
            this.password = createHash(this.password);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

userSchema.plugin(mongoosePaginate)

const usersModel = model(userCollection, userSchema);

module.exports = {
    usersModel
}