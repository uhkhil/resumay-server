const resumeService = require('./resumeService')

const fetch = async (req, res) => {
    const response = {}
    const { userId } = req.query
    const resume = await resumeService.fetchResume(userId)
    if (resume === null) {
        response.status = false
        response.message = 'Resume does not exist.'
    } else {
        response.status = true
        response.resource = [resume]
    }
    res.json(response)
}

const create = async (req, res) => {
    const response = {}
    const user = await resumeService.extractUserInfo(req)
    const userId = user.uid
    const { providerId, profile } = req.body
    const resume = await resumeService.fetchResume(userId)
    if (resume !== null) {
        response.status = false
        response.message = 'A resume exists already.'
    } else {
        const _id = await resumeService.createResume(userId, providerId, profile)
        response.status = true
        response.resource = [_id]
    }
    res.json(response)
}

const update = async (req, res) => {
    const response = {}
    const user = await resumeService.extractUserInfo(req)
    const userId = user.uid
    const body = req.body
    const updated = await resumeService.updateResume(userId, body)
    if (updated) {
        response.status = true
        response.message = 'Updated successfully.'
    } else {
        response.status = false
        response.message = 'Failed to update successfully.'
    }
    res.json(response)
}

const purge = async (req, res) => {
    res.json({ status: true, message: 'Deleted. Not really, this is pending.' })
}

module.exports = { fetch, create, update, purge }