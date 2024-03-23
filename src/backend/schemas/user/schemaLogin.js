const Joi = require('joi')

const schemaLogin = Joi.object({
    email: Joi.string().email().required().messages({
        'string.empty': 'O email não pode estar vazio',
        'string.email': 'O email deve ser válido'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'A senha deve ter no mínimo {#limit} caracteres',
        'string.empty': 'A senha não pode estar vazia'
    })
})

module.exports = schemaLogin