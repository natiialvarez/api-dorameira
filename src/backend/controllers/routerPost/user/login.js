const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    try {
        const user = req.user
        const tokenLogin = await jwt.sign({ id: req.user.id }, process.env.JWT_PASSWORD, { expiresIn: '30d' })
        delete user.password
        return res.json({
            message: `Usuario ${user.name}, com o email ${user.email} logado com sucesso. \n 
            Token:\n 
            ${tokenLogin}`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal Error' })
    }
}

module.exports = login