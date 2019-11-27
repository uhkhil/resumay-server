const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const secrets = require('../secrets')

const url = secrets.mongoUrl
const dbName = 'resumay'
let dbInstance

const connect = () => {
    MongoClient.connect(url, function (err, client) {
        assert.equal(null, err)
        console.log("Connected successfully to server")
        dbInstance = client.db(dbName)
    })
}

const db = () => {
    return dbInstance
}

module.exports = {
    connect,
    db,
}