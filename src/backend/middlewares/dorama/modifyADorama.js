const knex = require('../../database/connection')

const verificationIfTheUserPost = async (req, res, next) => {
    const { id } = req.params;
    const user = req.user
    try {
        const existingDorama = await knex('doramas').where({ id, added_by_user_id: user.id }).first()
        if (!existingDorama) {
            return res.status(404).json({ message: 'Dorama não encontrado, ou você não tem autorização para modifica-lo.' })
        }
        next()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Error' });
    }
}

module.exports = verificationIfTheUserPost