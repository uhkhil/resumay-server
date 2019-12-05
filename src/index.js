const express = require('express')
const cors = require('cors')
const admin = require('firebase-admin');

const mongo = require('./services/mongo')
const resumeController = require('./resume/resumeController')
const resumeValidator = require('./resume/resumeValidator')

const firebaseCredentials = JSON.parse(process.env.FIREBASE_CERT)

admin.initializeApp({
    credential: admin.credential.cert(firebaseCredentials),
    databaseURL: process.env.FIREBASE_DATABASE_URL
});

mongo.connect()

const app = express()

app.use(express.json())
app.use(cors())

app.get('/resume', resumeValidator.fetch, resumeController.fetch)
app.post('/resume', resumeValidator.create, resumeController.create)
app.patch('/resume', resumeValidator.update, resumeController.update)
app.delete('/resume', resumeController.purge)

app.listen(process.env.PORT || 8000)
