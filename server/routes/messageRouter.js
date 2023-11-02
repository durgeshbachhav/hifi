const { addMessage, getMessage } = require('../controllers/messageController');
const requireduser = require('../middleware/requireduser');

const router = require('express').Router();

router.post('/', requireduser, addMessage)
router.get('/:chatId', requireduser, getMessage)

module.exports = router;