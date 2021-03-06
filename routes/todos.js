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
            Todo.findTodoByUserId(data.id, (err, todo) => {
                if (err) throw err;
                if (todo.length > 0) {
                    // dateBeautify(todo);
                }
                res.send(todo);
            });
        }
    });
});

/* create new todo */
router.post('/new/create', (req, res) => {
    jwt.verify(req.body.token, 'secretkey', (err, data) => {
        if (err) {
            res.status(401).send('expired');
            throw err;
        } else {
            const newTodo = new Todo.TodoSchema({
                user: data.id,
                title: req.body.title,
                body: req.body.body,
                tasks: req.body.tasks,
                created_at: req.body.created_at,
                parent: req.body.parent,
                position: req.body.position,
                active: req.body.active,
                deleted: req.body.deleted,
            });
            Todo.createTodo(newTodo, (err, todo) => {
                if (err) {
                    return res.status(422).send(err)
                }
                res.send(todo);
            });
        }
    });
});
/* create a task under a todo */
router.post('/new/task', (req, res) => {
    jwt.verify(req.body.task.token, 'secretkey', (err, data) => {
        if (err) {
            res.status(401).send('expired');
            throw err;
        } else {
            delete req.body.task.token;
            req.body.task._id = '';
            console.log(req.body.task);
            Todo.createTaskById(req.body, (err, task) => {
                if (err) {
                    return res.status(422).send(err)
                }
                res.send(task);
            });
        }
    });
});

router.post('/todo-list/change-task-status', (req, res) => {
    jwt.verify(req.body.token, 'secretkey', (err, data) => {
        if (err) {
            res.status(401).send('expired');
            throw err;
        } else {
            Todo.changeTaskStatus(req.body.todoId, data.id, req.body.id, (err, response) => {
                if (err) {
                    res.status(401).send('expired');
                    throw err;
                }
                res.send(response);
            });
        }
    });
});

router.post('/todo/delete', (req, res) => {
    jwt.verify(req.body.token, 'secretkey', (err, data) => {
        if (err) {
            res.status(401).send('expired');
            throw err;
        } else {
            let todo = {
                'user': data.id,
                'todo': req.body.todoId
            };
            Todo.changeTodoStatus(todo, (err, result) => {
                if (err) {
                    return res.status(422).send(err);
                }
                res.send(result);
            });
        }
    });
});

router.post('/todo-save-order', (req, res) => {
    jwt.verify(req.body.token, 'secretkey', (err, data) => {
        if (err) {
            res.status(401).send('expired');
            throw err;
        } else {
            //  dateParse(req.body.newOrder);
            const dt = {
                user: data.id,
                todo: req.body.todoId,
                newOrder: req.body.newOrder
            };
            Todo.TodoSaveOrder(dt, (err, response) => {
                if (err) {
                    return res.status(422).send(err);
                }
                res.send(response);
            });
        }
    });
});

function dateBeautify(data) {
    data.forEach((currentValue, index, arr) => {
        let m = new Date(parseInt(currentValue.created_at));
        currentValue.created_at = m.getFullYear() + '-' + m.getMonth() + '-' + m.getDate() + ' ' + m.getHours() + ':' + m.getMinutes() + ':' + m.getSeconds();
        currentValue.tasks.forEach((val) => {
            let d = new Date(parseInt(val.created_at));
            val.created_at = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '  ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
            if (val.tasks.length > 0) {
                dateBeautify(val.tasks);
            }
        });

    });

}

function dateParse(data) {
    data.forEach((currentValue, index, arr) => {
        console.log(currentValue.created_at);
        let m = "'" + new Date(currentValue.created_at) + "'";
        currentValue.created_at = Date.parse(m);
        currentValue.tasks.forEach((val) => {
            let d = "'" + new Date(val.created_at) + "'";
            val.created_at = Date.parse(d);
            if (val.tasks.length > 0) {
                dateParse(val.tasks);
            }
        });

    });
}

module.exports = router; 