const knex = require('../../database/connection')
const generateErrorDetails = require('../joi/errorJoi')

const validateExistingDorama = (joiSchema) => {
    return async (req, res, next) => {
        const { name } = req.body
        try {
            await joiSchema.validateAsync(req.body, { abortEarly: false })
            const lowerCaseName = name.toLowerCase()
            const dorama = await knex('doramas')
                .whereRaw('LOWER(name) = ?', [lowerCaseName])
                .orWhereRaw('UPPER(name) = ?', [lowerCaseName.toUpperCase()])
                .first()
            if (dorama) {
                return res.status(200).json({ message: `Dorama ${name} já está cadastrado.` })
            }
            next()

        } catch (error) {
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
    validateExistingDorama
}