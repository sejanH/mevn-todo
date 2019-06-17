const User = require('../models/user');
const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');

router.post('/signup', [
    check('name').not().isEmpty().withMessage('Name is required'),
    check('email', 'Email is required').not().isEmpty().isEmail().withMessage('Email not valid'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Password length is minimum 6 characters')
        .custom((value, { req, loc, path }) => {
            if (value != req.body.cpassword) {
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        }),
    check('cpassword').not().isEmpty()
], async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let cpassword = req.body.cpassword;
    let name = req.body.name;

    // Check if this user already exisits
    let user = await User.UserSchema.findOne({ email: email });
    if (user) {
        return res.status(422).send({ email: 'That user already exisits!' });
    } else {
        // Insert the new user if they do not exist yet
        user = new User.UserSchema({
            name: name,
            password: password,
            email: email,
            todos: []
        });
        //create user
        User.createUser(user, function (err, user) {
            if (err) {
                return res.status(422).send(err)
            }
            res.send(user);
        });
    }
});

router.post('/login', [
    check('email', 'Email is required').not().isEmpty().isEmail().withMessage('Email not valid'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Password length is minimum 6 characters'),
], async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.status(422).send({
                email: 'User does not exist'
            })
        }
        User.comparePassword(password, user, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                res.send(isMatch);
            } else {
                res.status(422).send({ password: 'Wrong password' });
            }
        });
    })
})


module.exports = router;