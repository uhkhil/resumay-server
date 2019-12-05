const Joi = require('@hapi/joi')
const admin = require('firebase-admin');

const event = Joi.object({
    eventName: Joi.string().min(1).max(30).required(),
    instituteName: Joi.string().min(1).max(30).required(),
    date: Joi.date().max('now').required(),
    description: Joi.string().allow('').max(500).optional(),
})

const certification = Joi.object({
    certificationName: Joi.string().min(1).max(30).required(),
    instituteName: Joi.string().min(1).max(30).required(),
    startDate: Joi.date().max('now').required(),
    endDate: Joi.date().max('now').required(),
    location: Joi.string().min(1).max(30).required(),
    description: Joi.string().allow('').max(500).optional(),
})

const education = Joi.object({
    degreeName: Joi.string().min(1).max(30).required(),
    instituteName: Joi.string().min(1).max(30).required(),
    startDate: Joi.date().max('now').required(),
    endDate: Joi.date().max('now').required(),
    location: Joi.string().min(1).max(30).required(),
    description: Joi.string().allow('').max(500).optional(),
})

const skill = Joi.string().max(30)

const project = Joi.object({
    projectName: Joi.string().min(1).max(30).required(),
    date: Joi.date().max('now').required(),
    skills: Joi.array().items(skill).optional(),
    link: Joi.string().allow('').max(30).optional(),
    description: Joi.string().allow('').max(500).optional(),
})

const company = Joi.object({
    title: Joi.string().min(1).max(30).required(),
    companyName: Joi.string().min(1).max(30).required(),
    startDate: Joi.date().max('now').required(),
    endDate: Joi.date().max('now').required(),
    location: Joi.string().min(1).max(30).required(),
    description: Joi.string().allow('').max(500).optional(),
    projects: Joi.array().items(project).optional()
})

const profileInfo = {
    firstName: Joi.string().min(1).max(30).optional(),
    lastName: Joi.string().min(1).max(30).optional(),
    image: Joi.string().optional(),
    email: Joi.string().optional(),
    phone: Joi.number().optional(),
    city: Joi.string().min(1).max(30).optional(),
    country: Joi.string().min(1).max(30).optional(),
}

const tag = Joi.string().max(30)

const resume = Joi.object({
    ...profileInfo,
    bio: Joi.string().min(1).max(500).optional(),
    tags: Joi.array().items(tag).optional(),
    experiences: Joi.array().items(company).optional(),
    education: Joi.array().items(education).optional(),
    certifications: Joi.array().items(certification).optional(),
    events: Joi.array().items(event).optional(),
})

const auth = async (req, res, next) => {
    const headers = req.headers;
    const { idtoken } = headers;
    if (!idtoken) {
        res.status(401).json({ status: false, message: 'Unauthorized user.' })
        return;
    }
    try {
        const user = await admin.auth().verifyIdToken(idtoken)
    } catch (error) {
        console.error(error);
        res.status(401).json({ status: false, message: 'Unauthorized user.' })
        returnl
    }
    next();
}

const create = [
    auth,
    (req, res, next) => {
        next();
    }
]

const fetch = [
    (req, res, next) => {
        if (!req.query.userId) {
            res.status(400).json({ status: false, message: 'Missing userId.' })
        }
        next();
    }
]

const update = [
    auth,
    (req, res, next) => {
        const bodyValidity = resume.validate(req.body)
        if (bodyValidity.error) {
            res.status(400).json({ status: false, message: bodyValidity.error.details[0].message })
        }
        next();
    }
]


module.exports = { create, fetch, update }