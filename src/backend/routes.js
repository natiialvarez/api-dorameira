const express = require('express');
const showAllDoramas = require('./controllers/routerGet/dorama/search');
const findADorama = require('./controllers/routerGet/dorama/searchForADorama');
const { validateExistingDorama } = require('./middlewares/dorama/validateIfADoramaExist');
const schemaValidateAExistingDorama = require('./schemas/doramas/schemaValidateADorama');
const newDorama = require('./controllers/routerPost/dorama/addNewDorama');
const changeDorama = require('./controllers/routerPut/dorama/changeDoramaOfUser');
const schemaCreateNewUser = require('./schemas/user/schemaNewUser');
const checkEmail = require('./middlewares/user/checkEmail');
const newUser = require('./controllers/routerPost/user/createNewUser');
const validationLogin = require('./middlewares/user/validadeEmail&Password');
const schemaLogin = require('./schemas/user/schemaLogin');
const login = require('./controllers/routerPost/user/login');
const authentication = require('./middlewares/user/authentication');
const updateUser = require('./controllers/routerPut/user/updateUser');
const schemaUpdateUser = require('./schemas/user/schemaUpdate');
const verificationIfTheUserPost = require('./middlewares/dorama/modifyADorama');

const router = express()

router.get('/doramas',
    showAllDoramas) // mostrar os doramas cadastrados OK
router.get('/dorama',
    findADorama) //encontrar um dorama pelo nome OK
router.post('/user',
    checkEmail(schemaCreateNewUser),
    newUser) //cadastrar novo usuario OK
router.post('/login',
    validationLogin(schemaLogin),
    login) //Logar Usuario OK

// Apenas com Usuario Cadastrado.
router.use(authentication) // OK

router.put('/user',
    updateUser(schemaUpdateUser)) //atualizar dados do usuario OK
router.post('/doramas',
    validateExistingDorama(schemaValidateAExistingDorama),
    newDorama) //adiciona um novo dorama - OK
router.put('/doramas/:id',
    verificationIfTheUserPost,
    changeDorama) // atualiza um dorama com que foi cadastrada pelo usuario - OK
router.get('/doramas/:id') // mostra os doramas que o usuario cadastrou


module.exports = router