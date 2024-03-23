const jwt = require('jsonwebtoken')
const knex = require('../../database/connection')

const authentication = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ message: 'Usuario não autorizado' })
    }
    try {
        const token = authorization.split(' ')[1]
        const { id } = await jwt.verify(token, process.env.JWT_PASSWORD)
        if (!id) {
            return res.status(401).json({ message: 'Usuario não encontrado' })
        }
        const userFound = await knex('users').where({ id }).first()
        delete userFound.password
        req.user = userFound
        next()
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' })
    }
}

const isOwner = async (req, res, next) => {
    const { userid } = req.params
    try {
        const user = req.user
        if (parseInt(userid) === user.id) {
            next()
        } else {
            console.log(userid, user.id)
            return res.status(403).json({ message: 'Você não tem permissão para acessar este recurso.' })

        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Error' })
    }
}

module.exports = {
    authentication,
    isOwner
}