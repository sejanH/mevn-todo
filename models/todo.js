const { UserSchema } = require('./user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.DB_HOST + process.env.DB_NAME, { useNewUrlParser: true });
var db = mongoose.connection;

const Todo = mongoose.model('Todo', new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        minlength: 2
    },
    body: {
        type: String,
        required: true,
        minlength: 2
    },
    tasks: {
        type: Array,
        default: []
    },
    created_at: {
        type: String
    },
    parent: {
        type: String, default: 0
    },
    position: {
        type: String, default: 1
    },
    active: {
        type: Boolean, default: true
    },
    deleted: {
        type: Boolean, default: false
    }
}));

module.exports.TodoSchema = Todo;
module.exports.createTodo = (newTodo, callback) => {
    newTodo.save(callback);
};

module.exports.findTodoByUserId = function (userId, callback) {
    //UserSchema.findById(mongoose.Types.ObjectId(userId), callback);
    Todo.find({ user: userId }, callback);

}

module.exports.createTaskById = (newTask, callback) => {
    newTask.task._id = mongoose.Types.ObjectId();
    Todo.updateOne({ "_id": mongoose.Types.ObjectId(newTask.id) }, { "tasks": newTask.task }, callback);
};

module.exports.changeTodoStatus = (userId, todoId, callback) => {
    console.log({ userId, todoId });
};