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

module.exports = {
    fetchResume
}