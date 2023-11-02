const requireduser = require('../middleware/requireduser');
const chatController = require('../controllers/chatController')

const router = require('express').Router();

router.post('/', requireduser, chatController.createChatController)
router.get('/:userId', requireduser, chatController.userChatController)
router.get('/find/:firstId/:secondId', requireduser, chatController.findChatController)


module.exports = router;