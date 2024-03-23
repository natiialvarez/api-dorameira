const knex = require('../../../database/connection')
const bcrypt = require('bcrypt')

const newUser = async (req, res) => {
    const { name, email, password, date_of_birth } = req.body
    try {
        const passwordEncoded = await bcrypt.hash(password, 10)
        const newUser = {
            name,
            email,
            password: passwordEncoded,
            date_of_birth
        }
        await knex('users').insert(newUser)
        return res.status(201).json({ message: `Cadastro realizado com sucesso!` })
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' })
    }
}

module.exports = newUser