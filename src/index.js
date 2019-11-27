const express = require('express')
const mongo = require('./services/mongo')
const resumeController = require('./resume/resumeController')

mongo.connect()

const app = express()

app.get('/resume', resumeController.fetch)
app.post('/resume', resumeController.create)
app.patch('/resume', resumeController.update)
app.delete('/resume', resumeController.purge)

app.listen(3000)
