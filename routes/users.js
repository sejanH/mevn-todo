const { User, createUser } = require('../models/user');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

router.post('/new', [
    check('name').not().isEmpty().withMessage('Name is required').trim().escape(),
    check('password', 'Password is required').not().isEmpty().isLength({ min: 6 }).withMessage('Password length is minimum 6 characters').trim().escape(),
    check('cpassword').optional().not().isEmpty().withMessage('Confirm Password is required')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Password confirmation is incorrect');
            }
            return true;
        }).trim().escape(),
    check('email', 'Email is required').not().isEmpty().isEmail().withMessage('Email is not valid').trim().escape()
], async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    //Check if this user already exisits
    let user = await User.findOne({ email: email });
    if (user) {
        return res.status(422).send('-1');
    } else {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array());
        }
        // Insert the new user if they do not exist yet
        user = new User({
            name: name,
            password: password,
            email: email,
            todos: []
        });
        //create user
        createUser(user, function (err, user) {
            if (err) {
                return res.status(422).send(err)
            }
            res.send(user);
        });
    }
});

module.exports = router;