const knex = require('../../database/connection')
const bcrypt = require('bcrypt')
const generateErrorDetails = require('../joi/errorJoi')

const validationLogin = (joiSchema) => {
    return async (req, res, next) => {
        const { email, password } = req.body
        try {
            await joiSchema.validateAsync(req.body, { abortEarly: false })
            const user = await knex('users')
                .where('email', email)
                .first()
            if (!user) {
                return res.status(400).json({ message: `Email ou Senha incorretos` })
            }
            const validatePassword = await bcrypt.compare(password, user.password)
            if (!validatePassword) {
                return res.status(400).json({ message: `Email ou Senha incorretos` })
            }
            req.user = user
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

module.exports = validationLogin