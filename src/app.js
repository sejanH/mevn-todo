
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const baseUrl = process.env.NEXT_STATIC_BASE_URL || "http://localhost:8081";

let options = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Request-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
}
app.use(cors(options))
app.get(baseUrl + '/posts', (req, res) => {
    res.send(
        [{
            title: "Hello World!",
            description: "Hi there! How are you?"
        }]
    )
})
app.listen(process.env.PORT || 8081)
console.log("Server started")