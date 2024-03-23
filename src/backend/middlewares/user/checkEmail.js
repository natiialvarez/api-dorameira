const knex = require('../../database/connection')
const generateErrorDetails = require('../joi/errorJoi')

const checkEmail = (joiSchema) => {
    return async (req, res, next) => {
        const { email } = req.body
        try {
            await joiSchema.validateAsync(req.body, { abortEarly: false })
            const userWithEmail = await knex('users')
                .where('email', email)
                .first()
            if (userWithEmail) {
                return res.status(400).json({ message: `O email utilizado já tem um cadastrado no site.` })
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

module.exports = checkEmail