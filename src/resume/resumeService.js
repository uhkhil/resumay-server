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

const createResume = async (userId, providerId, profile) => {
    try {
        const resumeObj = {
            userId,
            image: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
            country: '',
            tags: [],
            bio: '',
            experiences: [],
            education: [],
            certifications: [],
            events: []
        }
        // TODO: Add providerId wise checks
        if (profile.given_name) {
            resumeObj.firstName = profile.given_name
        }
        if (profile.family_name) {
            resumeObj.lastName = profile.family_name
        }
        if (profile.picture) {
            resumeObj.image = profile.picture
        }
        if (profile.email) {
            resumeObj.email = profile.email
        }
        const result = await mongo.db().collection(constants.MONGO_COLLECTIONS.RESUME).insertOne(resumeObj)
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