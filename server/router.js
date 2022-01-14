const router = require('express').Router();
const userController = require('./controller/user-controller');


router.post('/', userController.postUsers)
router.get('/user', userController.getUsers)


module.exports = router;