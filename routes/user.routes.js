const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()


router.post('', userController.createUser)
router.get('', userController.getAllUsers)
router.get('/ten', userController.getTopTenUsers)
router.get('/count', userController.getUserLength)
router.delete('/removeall', userController.removeAllUsers)
router.delete('', userController.deleteUser)

module.exports = router
