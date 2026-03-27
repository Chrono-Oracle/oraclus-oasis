const { Router } = require('express');
const router = Router();
const userController = require('../src/controllers/user.controller')
const { userValidation } = require('../utils/validations/user.validation')
const { adminMiddleware } = require('../utils/middlewares/admin.middleware')


router.post('/register', userValidation, userController.register)
router.post('/login', userController.login)


//Admin Routes
router.get('/', adminMiddleware, userController.findMany)

module.exports = router;
