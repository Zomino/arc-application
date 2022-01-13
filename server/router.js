const router = require('express').Router();
const userController = require('./controller/user-controller');


router.post('/', userController.postUsers)


module.exports = router;