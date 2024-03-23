const knex = require('../../database/connection')

const deleteDoramaFromList = async (req, res) => {
    const { userid } = req.params
    try {
        const doramaUse = req.doramaUse
        await knex('my_list')
            .where('user_id', userid)
            .where('dorama_id', doramaUse.id)
            .delete()

        return res.status(201).json({ message: 'Dorama removido da lista do usuário com sucesso' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = deleteDoramaFromList