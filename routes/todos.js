const Todo = require('../models/todo');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const jwt = require('jsonwebtoken');


router.get('/my-todos', (req, res) => {
    jwt.verify(req.query.token, 'secretkey', (err, data) => {
        if (err) {
            res.status(401).send('expired');
            throw err;
        } else {
            Todo.findTodoById(data.id, (err, todo) => {
                if (err) throw err;
                res.send(todo.todos);
            });
        }
    });
});



module.exports = router;