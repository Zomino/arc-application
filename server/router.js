const router = require('express').Router();
const userController = require('./controller/user-controller');
const eventController = require('./controller/event-controller');


router.post('/usercreate', userController.postUsers)
router.post('/user', userController.getUser)
router.get('/userlist', userController.getUsers)
router.post('/eventcreate', eventController.postEvents)
router.post('/eventsList', eventController.getEventsList)
router.post('/currentEvent', eventController.getEvent)



module.exports = router;