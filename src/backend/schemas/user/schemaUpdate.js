const Joi = require('joi');

const schemaUpdateUser = Joi.object({
    name: Joi.string().min(2)
        .messages({
            'string.empty': 'O nome não pode estar vazio',
            'string.min': 'O nome deve ter no mínimo {#limit} caracteres'
        }),
    email: Joi.string().email()
        .messages({
            'string.email': 'O email fornecido não é válido'
        }),
    password: Joi.string().min(6)
        .messages({
            'string.min': 'A senha deve ter no mínimo {#limit} caracteres'
        }),
    date_of_birth: Joi.date().iso()
        .messages({
            'date.iso': 'A data de nascimento fornecida não é válida'
        })
});

module.exports = schemaUpdateUser;