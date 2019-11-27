const mongo = require('../services/mongo')
const constants = require('../constants')

const fetchResume = async (userId) => {
    try {
        const resume = await mongo.db().collection(constants.MONGO_COLLECTIONS.RESUME).findOne({ userId })
        return resume
    } catch (err) {
        console.warn(err)
        return null
    }
}

const createResume = async (userId) => {
    try {
        const result = await mongo.db().collection(constants.MONGO_COLLECTIONS.RESUME).insertOne({ userId })
        return result.insertedId
    } catch (err) {
        console.warn(err)
        return false
    }
}

const updateResume = async (userId, body) => {
    try {
        await mongo.db().collection(constants.MONGO_COLLECTIONS.RESUME).updateOne({ userId }, { $set: body })
        return true
    } catch (err) {
        console.warn(err)
        return false
    }
}

module.exports = {
    fetchResume,
    createResume,
    updateResume
}