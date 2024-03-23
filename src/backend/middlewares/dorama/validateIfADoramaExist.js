const knex = require('../../database/connection')
const generateErrorDetails = require('../joi/errorJoi')

const validateExistingDoramaTrue = (joiSchema) => {
    return async (req, res, next) => {
        const { dorama } = req.body
        try {


            const doramaExist = await knex('doramas')
                .whereRaw('LOWER(name) = ?', [dorama.toLowerCase()])
                .orWhereRaw('UPPER(name) = ?', [dorama.toUpperCase()])
                .first()
            if (doramaExist) {
                return res.status(200).json({ message: `Dorama ${dorama} já está cadastrado.` })
            }
            next()

        } catch (error) {
            console.log(error)
            if (error.isJoi) {
                const errorDetails = generateErrorDetails(error)
                return res.status(400).json({ errors: errorDetails })
            } else {
                return res.status(500).json({ message: 'Internal Error' })
            }
        }
    }
}

const validateExistingDoramaTrueForList = (joiSchema) => {
    return async (req, res, next) => {
        const { dorama } = req.body
        try {
            await joiSchema.validateAsync(req.body, { abortEarly: false })

            const doramaExist = await knex('doramas')
                .whereRaw('LOWER(name) = ?', [dorama.toLowerCase()])
                .orWhereRaw('UPPER(name) = ?', [dorama.toUpperCase()])
                .first()
            if (!doramaExist) {
                return res.status(404).json({ message: 'Dorama não está cadastrado' })
            }
            req.doramaUse = doramaExist
            next()
        } catch (error) {
            console.log(error)
            if (error.isJoi) {
                const errorDetails = generateErrorDetails(error)
                return res.status(400).json({ errors: errorDetails })
            } else {
                return res.status(500).json({ message: 'Internal Error' })
            }
        }
    }
}

module.exports = {
    validateExistingDoramaTrue,
    validateExistingDoramaTrueForList
}