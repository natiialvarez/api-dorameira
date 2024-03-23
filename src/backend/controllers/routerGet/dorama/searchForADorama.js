const knex = require('../../../database/connection')

const findADorama = async (req, res) => {
    const { name } = req.query;
    try {
        const lowerCaseName = name.toLowerCase()

        const dorama = await knex('doramas')
            .whereRaw('LOWER(name) = ?', [lowerCaseName])
            .orWhereRaw('UPPER(name) = ?', [lowerCaseName.toUpperCase()])
            .first();

        if (!dorama) {
            return res.status(404).json({ message: 'Dorama not found' })
        }
        return res.status(200).json(dorama)
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' })
    }
};

module.exports = findADorama