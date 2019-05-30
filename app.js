
const express = require('express')
//var expressValidator = require('express-validator');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const mongo = require('mongodb');
const mongoose = require('mongoose');
const db = mongoose.connection;

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
//app.use(expressValidator)
app.use(bodyParser.urlencoded({ extended: true }));
const baseUrl = process.env.NEXT_STATIC_BASE_URL || "http://localhost:8081";
let options = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
}
app.use(cors(options))
app.get('/posts', (req, res) => {
    res.send(
        [{
            id: 1,
            title: "Hello World!",
            description: "Hi there! How are you?"
        },
        {
            id: 2,
            title: "Hello World!",
            description: "Hi there! How are you?"
        },
        {
            id: 3,
            title: "Hello World!",
            description: "Hi there! How are you?"
        }
        ]
    )
});
var User = require('./models/user');
app.post('/signup', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var cpassword = req.body.cpassword;
    var name = req.body.name;
    /*validation*/
    /*    req.checkBody('email','Email is required').notEmpty();
        req.checkBody('email','Email not valid').isEmail();
        req.checkBody('name','Name is required').notEmpty();
        req.checkBody('password','password is required').notEmpty();
        req.checkBody('cpassword','passwords don\'t match').equals(password);
        var errors = req.validationErrors();
        if(errors){
            res.json({response:errors});
        } else {*/
    var newUser = new User({
        name: name,
        password: password,
        email: email,
        todos: []
    });
    //create user
    User.createUser(newUser, function (err, user) {
        if (err) {
            console.log(err);
            return 0;
        }
        console.log(user);
        return 1;
    });

    /*    }*/
});


app.listen(process.env.PORT || 8081)
console.log("Hello World")
// module.exports.baseUrl = baseUrl;