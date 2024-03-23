const Joi = require('joi')

const schemaValidateAExistingDorama = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'O nome do dorama é obrigatório',
        'string.empty': 'O nome do dorama não pode estar vazio'
    }),
    summary: Joi.string().required().messages({
        'any.required': 'O resumo do dorama é obrigatório',
        'string.empty': 'O resumo do dorama não pode estar vazio'
    }),
    release_date: Joi.date().required().messages({
        'any.required': 'A data de lançamento é obrigatória',
        'date.base': 'A data de lançamento deve ser uma data válida'
    }),
    episodes: Joi.number().integer().min(1).required().messages({
        'any.required': 'O número de episódios é obrigatório',
        'number.base': 'O número de episódios deve ser um número',
        'number.integer': 'O número de episódios deve ser um número inteiro',
        'number.min': 'O número de episódios deve ser pelo menos 1'
    }),
    where_to_watch: Joi.string().required().messages({
        'any.required': 'Onde assistir é obrigatório'
    })
})

module.exports = schemaValidateAExistingDorama