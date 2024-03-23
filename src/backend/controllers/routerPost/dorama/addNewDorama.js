const knex = require('../../../database/connection')


const newDorama = async (req, res) => {
    const { name, summary, release_date, episodes, where_to_watch } = req.body
    try {
        const newName = name.charAt(0).toUpperCase() + name.slice(1)
        const user = req.user
        const newDorama = {
            name: newName,
            summary,
            release_date,
            episodes,
            where_to_watch,
            added_by_user_id: user.id,
            add_by_user_email: user.email
        }
        await knex('doramas').insert(newDorama)
        await knex('users')
            .where('id', user.id)
            .update({ registered_dorama_name: newName });

        return res.status(201).json({ message: `Dorama ${name} cadastrado com sucesso` })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Error' })
    }
}

module.exports = newDorama