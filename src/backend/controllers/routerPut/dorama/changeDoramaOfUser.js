const knex = require('../../../database/connection')

const changeDorama = async (req, res) => {
    const { id } = req.params;
    const { name, summary, release_date, episodes, where_to_watch } = req.body

    try {
        await knex('doramas')
            .where({ id })
            .update({
                name,
                summary,
                release_date,
                episodes,
                where_to_watch
            });

        return res.status(200).json({ message: 'Dorama modificado com sucesso.' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal Error' })
    }
}


module.exports = changeDorama