//require modules for our User modules
let mongoose = require('mongoose');
let schema = mongoose.schema; // alias for mongoose schema
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new schema({
    username: {
        type: String,
        trim: true,
        required: 'username is required'
    },
    password: {
        type: String,
        trim: true,
        required: 'password is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'email is required'
    },

    displayName: {
        type: String,
        trim: true,
        required: 'display name is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
},{
    collecion:"users"
});

let options = ({missingPasswordErrorL: 'Wrong Password'});

userSchema.plugin(passportLocalMongoose, options);

exports.User = mongoose.model('User',userSchema);