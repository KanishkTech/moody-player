const express = require('express')
const songRouter = require ('./Routes/songs.route')
const app = express()
const cors = require('cors')

app.use(express.json());
app.use(cors());
app.use('/',songRouter)

module.exports = app;

