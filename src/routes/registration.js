const Router = require('express');
const router = new Router();
const RegistrationsController = require('../controllers/registration');

router.get('/registration', RegistrationsController.getAllRegistrations);
router.post('/event/:event_id/registration/:user_id', RegistrationsController.createRegistration);
router.put('/event/:id/registration/:id', RegistrationsController.updateRegistration);
router.delete('/registration/:id', RegistrationsController.deleteRegistration);

module.exports = router;