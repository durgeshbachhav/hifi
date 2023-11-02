const postController = require('../controllers/postController');
const requireduser = require('../middleware/requireduser');

const router = require('express').Router();

router.post('/', requireduser, postController.createPost)
router.post('/likeOrUnlike', requireduser, postController.likeAndUnlikePost)
router.put('/', requireduser, postController.updatePostController)
router.delete('/', requireduser, postController.deletePost)

module.exports = router;