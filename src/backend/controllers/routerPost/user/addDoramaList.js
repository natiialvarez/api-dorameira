const knex = require('../../../database/connection')

const addDoramaList = async (req, res) => {
    const { userid } = req.params
    const { dorama } = req.body
    try {
        const doramaUse = req.doramaUse
        const addDoramaList = {
            user_id: userid,
            dorama_name: dorama,
            dorama_id: doramaUse.id
        }
        await knex('my_list').insert(addDoramaList).where('id', userid)
        return res.status(201).json({ message: 'Dorama adicionado à lista do usuário com sucesso' })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = addDoramaList