const Router = require('express');
const router = new Router();
const EventsController = require('../controllers/events');

router.get('/events', EventsController.getAllEvents);
router.get('/events/:id', EventsController.getEvent);
router.post('/events/:user_id', EventsController.createEvent);
router.put('/events/:id', EventsController.updateEvent);
router.delete('/events/:id', EventsController.deleteEvent);

module.exports = router;