const Todo = require('../models/todo');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const jwt = require('jsonwebtoken');


router.get('/my-todos', (req, res) => {
    var decoded = jwt.verify(req.query.token, 'secretkey');
    Todo.findTodoById(decoded.id, (err, todo) => {
        if (err) throw err;
        res.send(todo.todos);
    });
});



module.exports = router;