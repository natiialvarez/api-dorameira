const Joi = require('joi')

const schemaAddDoramaList = Joi.object({
    dorama: Joi.string().required().messages({
        'string.empty': 'O nome do Dorama não pode estar vazio',
    }),
    watched: Joi.boolean().required().messages({
        'any.required': 'O campo assistido é obrigatório',
        'boolean.base': 'O campo assistido deve ser um booleano'
    })
});

module.exports = schemaAddDoramaList