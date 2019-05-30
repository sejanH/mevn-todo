const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.connect('mongodb://mevn:xxxxxx00@ds143342.mlab.com:43342/mevn-todo', { useNewUrlParser: true });
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



exports.User = User;

exports.createUser = function (newUser, callback) {
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        newUser.save(callback);
    });
}