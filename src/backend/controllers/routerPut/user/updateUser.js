const knex = require('../../../database/connection')
const generateErrorDetails = require('../../../middlewares/joi/errorJoi')
const bcrypt = require('bcrypt')

const updateUser = (joiSchema) => {
    return async (req, res) => {
        const { name, email, password, date_of_birth } = req.body
        try {
            await joiSchema.validateAsync(req.body, { abortEarly: false })

            const emailInUse = await knex('users').where('email', email).whereNot('id', req.user.id).first();
            if (emailInUse) {
                return res.status(400).json({ mensagem: 'Email invalido' });
            }

            const user = req.user;
            const updateUser = {};

            updateUser.name = name ? name : user.name;
            updateUser.email = email ? email : user.email;
            updateUser.password = password ? await bcrypt.hash(password, 10) : user.password;
            updateUser.date_of_birth = date_of_birth ? date_of_birth : user.date_of_birth;

            await knex('users').where('id', user.id).update(updateUser)
            return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        } catch (error) {
            if (error.isJoi) {
                const errorDetails = generateErrorDetails(error)
                return res.status(400).json({ errors: errorDetails })
            } else {
                return res.status(500).json({ message: 'Internal Error' })
            }
        }
    }
}

module.exports = updateUser