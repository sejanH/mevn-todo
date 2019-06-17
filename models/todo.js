const { UserSchema } = require('./user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.DB_HOST + process.env.DB_NAME, { useNewUrlParser: true });
var db = mongoose.connection;

module.exports.findTodoById = function (userId, callback) {
    UserSchema.findById(mongoose.Types.ObjectId(userId), callback);
}