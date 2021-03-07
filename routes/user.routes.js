const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()


router.post('', userController.createUser)
router.get('', userController.getAllUsers)
router.delete('', userController.deleteUser)

module.exports = router
