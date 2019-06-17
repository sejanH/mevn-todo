const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.DB_HOST + process.env.DB_NAME, { useNewUrlParser: true });
var db = mongoose.connection;

const User = mongoose.model('User', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    todos: {
        type: Array,
        default: []
    }
}));



module.exports.UserSchema = User;

module.exports.createUser = function (newUser, callback) {
    bcrypt.hash(newUser.password, parseInt(process.env.SALT), function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    });
}

module.exports.getUserByEmail = (email, callback) => {
    User.findOne({ email }, callback);
}
module.exports.comparePassword = (plaintext, user, callback) => {
    bcrypt.compare(plaintext, user.password, (err, isMatch) => {
        if (err) return callback(err);
        //console.log(isMatch)
        let token = null
        let userId = null
        if (isMatch) {
            userId = user.id;
            token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: 86400 });
            callback(null, { isMatch, token });
        } else {
            callback(null, isMatch);
        }
    });
};