const router = require('express').Router();
const userController = require('./controller/user-controller');


router.post('/', userController.postUsers)
router.post('/user', userController.getUser)
router.get('/userlist', userController.getUsers)


module.exports = router;