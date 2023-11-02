const requireduser = require('../middleware/requireduser');
const userController = require('../controllers/userController')


const router = require('express').Router();

router.get('/get-post-of-followings', requireduser, userController.getPostsOfFollowing)
router.get('/get-my-posts', requireduser, userController.getMyPosts)
router.get('/get-user-post', requireduser, userController.getUserPosts)
router.get('/get-my-info', requireduser, userController.getMyInfo)
router.post('/get-user-profile', requireduser, userController.getUserProfile)
router.post('/follow-or-unfollow', requireduser, userController.followOrUnfollowUserController)
router.put('/', requireduser, userController.updateUserProfile)
router.delete('/delete', requireduser, userController.deleteMyProfile)

module.exports = router;