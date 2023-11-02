const { Signup, Login, refreshAccessTokenController, logoutController } = require('../controllers/authController');

const router = require('express').Router();

router.post('/signup',Signup)
router.post('/login',Login)
router.get('/refresh',refreshAccessTokenController)
router.post('/logout', logoutController)

module.exports = router;