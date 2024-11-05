const Router = require('express');
const router = new Router();
const UserController = require('../controllers/users');

router.get('/user', UserController.getAllUsers);
router.post('/user', UserController.createUser);
router.post('/logout', UserController.logoutUser);
router.put('/user/:id', UserController.updateUser);
router.put('/user/password/:id', UserController.updateUserPassword);
router.delete('/user/:id', UserController.deleteUser);

module.exports = router;