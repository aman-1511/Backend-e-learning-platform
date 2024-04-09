
const expres=require('express')
const routerAuth = expres.Router();
const multer = require('multer');
const { login } = require('../../controller/auth/login');
const { signUp } = require('../../controller/auth/signUp');
const upload = multer({ storage: multer.memoryStorage() });
routerAuth.post('/login', login)


routerAuth.post('/register', upload.single('profilepic'), signUp);
module.exports = routerAuth;