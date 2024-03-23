const Joi = require('joi')

const schemaCreateNewUser = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'O nome do usuário é obrigatório',
        'string.empty': 'O nome do usuário não pode estar vazio'
    }),
    email: Joi.string().email().required().messages({
        'string.empty': 'O email não pode estar vazio',
        'string.email': 'O email deve ser válido'
    }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'A senha deve ter no mínimo {#limit} caracteres',
        'string.empty': 'A senha não pode estar vazia'
    }),
    date_of_birth: Joi.date().iso().messages({
        'date.base': 'A data de nascimento deve estar no formato YYYY-MM-DD'
    })
})

module.exports = schemaCreateNewUser