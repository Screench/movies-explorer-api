const router = require('express').Router();
const { middlewareProfileUpdate } = require('../middleware/regex');

const { getCurrentUser, updateProfile } = require('../controllers/users');

router.get('/me', getCurrentUser);
router.patch('/me', middlewareProfileUpdate, updateProfile);

module.exports = router;
