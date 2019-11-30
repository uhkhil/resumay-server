const express = require('express')
const mongo = require('./services/mongo')
const resumeController = require('./resume/resumeController')
const cors = require('cors')

mongo.connect()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/resume', resumeController.fetch)
app.post('/resume', resumeController.create)
app.patch('/resume', resumeController.update)
app.delete('/resume', resumeController.purge)

app.listen(process.env.PORT || 8000)
