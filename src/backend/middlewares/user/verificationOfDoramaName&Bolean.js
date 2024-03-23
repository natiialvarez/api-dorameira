const knex = require('../../database/connection')
const generateErrorDetails = require('../joi/errorJoi')

const validateDoramaForListTrue = async (req, res, next) => {
    const { userid } = req.params
    const { dorama } = req.body
    try {
        const doramaIsAlreadyCheck = await knex('my_list')
            .where('user_id', userid)
            .whereRaw('LOWER(dorama_name) = ?', [dorama.toLowerCase()])
            .orWhereRaw('UPPER(dorama_name) = ?', [dorama.toUpperCase()])
        if (doramaIsAlreadyCheck.length > 0) {
            return res.status(404).json({ message: `O dorama ${dorama} já está na lista de assistidos` })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Error' })
    }
}

const validateDoramaForListFalse = async (req, res, next) => {
    const { userid } = req.params
    const { dorama } = req.body
    try {
        const doramaIsAlreadyCheck = await knex('my_list')
            .where('user_id', userid)
            .whereRaw('LOWER(dorama_name) = ?', [dorama.toLowerCase()])
            .orWhereRaw('UPPER(dorama_name) = ?', [dorama.toUpperCase()])
        if (doramaIsAlreadyCheck.length === 0) {
            return res.status(404).json({ message: `O dorama ${dorama} não está cadastrado na lista do usuário` })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Error' })
    }
}




module.exports = {
    validateDoramaForListTrue,
    validateDoramaForListFalse
}