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
                todo.todos.forEach((currentValue, index, arr) => {
                    let m = new Date(parseInt(currentValue.created_at));
                    currentValue.created_at = m.getFullYear() + '-' + m.getMonth() + '-' + m.getDate() + ' ' + m.getHours() + ':' + m.getMinutes() + ':' + m.getSeconds();
                    currentValue.tasks.forEach((val) => {
                        let d = new Date(parseInt(val.created_at));
                        val.created_at = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '  ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
                    })
                });
                res.send(todo.todos);
            });
        }
    });
});



module.exports = router;