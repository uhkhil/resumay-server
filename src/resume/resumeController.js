const resumeService = require('./resumeService')

const fetch = async (req, res) => {
    const { userId } = req.query
    const response = {}
    const resume = await resumeService.fetchResume(parseInt(userId))
    if (resume === null) {
        response.status = false
        response.message = 'Resume does not exist'
    } else {
        response.status = true
        response.resource = resume
    }
    res.json(response)
}

const create = (req, res) => {
    res.json({ status: true, message: 'Created resume' })
}

const update = (req, res) => {
    res.json(({ status: true, message: 'Updated' }))
}

const purge = (req, res) => {
    res.json({ status: true, message: 'Deleted' })
}

module.exports = { fetch, create, update, purge }