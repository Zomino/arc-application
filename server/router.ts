import { Router } from 'express';
import userController from './controller/user-controller';
import eventController from './controller/event-controller';

const router = Router();

router.post('/usercreate', userController.postUsers);
router.post('/user', userController.getUser);
router.get('/userlist', userController.getUsers);
router.post('/eventcreate', eventController.postEvent);
router.post('/eventsList', eventController.getEventsList);
router.post('/currentEvent', eventController.getEvent);
router.put('/events/:event/:user', eventController.updatePayment);

export default router;
