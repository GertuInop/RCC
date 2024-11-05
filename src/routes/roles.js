const Router = require('express');
const router = new Router();
const RolesController = require('../controllers/roles');

router.get('/user', RolesController.getAllRoles);
router.post('/user', RolesController.createRole);
router.put('/user/:id', RolesController.updateRole);
router.delete('/user/:id', RolesController.deleteRole);

module.exports = router;