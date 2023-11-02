const Post = require("../models/Post");
const User = require("../models/User");
const { uploadCloudinary } = require("../services/cloudinary");
const { mapPostOutput } = require("../utils/mapPost");
const { error, success } = require("../utils/responseWrapper");
const cloudinary = require('cloudinary').v2;


const createPost = async (req, res) => {
     try {
          const { caption, image } = req.body;
          if (!caption || !image) {
               return res.send(error(404, 'caption and post image are required'))
          }
          let imageData = {}

          if (image) {
               const results = await uploadCloudinary(image, 'socialmediapics');
               imageData = results;
          }
          const owner = req._id;
          const user = await User.findById(req._id)
          const post = await Post.create({
               owner,
               caption,
               image: imageData
          })

          user.posts.push(post._id)
          await user.save();
          res.send(success(200, { post }))
     } catch (e) {
          return res.send(error(500, e.message))
     }
}



const likeAndUnlikePost = async (req, res) => {
     try {
          const { postId } = req.body;
          // login wale bande ki id 
          const curUserId = req._id;
          const post = await Post.findById(postId).populate('owner')
          if (!post) {
               return res.send(error(404, 'post not found'))
          }
          if (post.likes.includes(curUserId)) {
               const index = post.likes.indexOf(curUserId)
               post.likes.splice(index, 1)
          } else {
               post.likes.push(curUserId)
          }
          await post.save();
          return res.send(success(200, { post }))
     } catch (e) {
          return res.send(error(500, e.message))

     }
}

const updatePostController = async (req, res) => {
     try {
          const { postId, caption } = req.body;
          const curUserId = req._id;
          const post = await Post.findById(postId)
          if (!post) {
               return res.send(error(404, 'post not found'))

          }
          if (post.owner.toString() !== curUserId) {
               return res.send(error(404, 'you are not the owner of this post'));
          }

          if (caption) {
               post.caption = caption;
          }
          await post.save();
          return res.send(success(200, { post:mapPostOutput(post , req._id) }))
     } catch (e) {
          return res.send(error(500, e.message))
     }

}

const deletePost = async (req, res) => {
     try {
          const { postId } = req.body;
          const curUserId = req._id;

          const post = await Post.findById(postId);
          const curUser = await User.findById(curUserId);
          if (!post) {
               return res.send(error(404, "Post not found"));
          }

          if (post.owner.toString() !== curUserId) {
               return res.send(error(403, "Only owners can delete their posts"));
          }

          const index = curUser.posts.indexOf(postId);
          curUser.posts.splice(index, 1);
          await curUser.save();
          await Post.deleteOne({ _id: postId });


          return res.send(success(200, "post deleted successfully"));
     } catch (e) {
          return res.send(error(500, e.message));
     }
};
module.exports = {
     createPost,
     likeAndUnlikePost,
     updatePostController,
     deletePost

}