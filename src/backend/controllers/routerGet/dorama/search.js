const knex = require('../../../database/connection')


const showAllDoramas = async (req, res) => {
    try {
        const doramas = await knex('doramas').select('*')
        return res.status(200).json(doramas)

    } catch (error) {
        return res.status(500).json({ mensage: 'Internal Error' })
    }
}

module.exports = showAllDoramas