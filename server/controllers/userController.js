const Post = require('../models/Post')
const User = require('../models/User')
const { success, error } = require("../utils/responseWrapper");
const { mapPostOutput } = require('../utils/mapPost');
const { uploadCloudinary } = require('../services/cloudinary');
const followOrUnfollowUserController = async (req, res) => {
     try {
          const { userIdToFollow } = req.body;
          const curUserId = req._id;

          const userToFollow = await User.findById(userIdToFollow);
          const curUser = await User.findById(curUserId);

          if (curUserId === userIdToFollow) {
               return res.send(error(409, "Users cannot follow themselves"));
          }

          if (!userToFollow) {
               return res.send(error(404, "User to follow not found"));
          }

          if (curUser.followings.includes(userIdToFollow)) {
               // already followed
               const followingIndex = curUser.followings.indexOf(userIdToFollow);
               curUser.followings.splice(followingIndex, 1);

               const followerIndex = userToFollow.followers.indexOf(curUser);
               userToFollow.followers.splice(followerIndex, 1);


          } else {
               userToFollow.followers.push(curUserId);
               curUser.followings.push(userIdToFollow);

          }

          await userToFollow.save();
          await curUser.save();

          return res.send(success(200, { user: userToFollow }))
     } catch (e) {
          return res.send(error(500, e.message));
     }
};


const getPostsOfFollowing = async (req, res) => {
     try {
       const curUserId = req._id;
       const curUser = await User.findById(curUserId).populate("followings");
   
       // Populate posts for each user in the followings array and sort posts by date
       const followingsWithPosts = await Promise.all(
         curUser.followings.map(async (user) => {
           const userWithPosts = await User.findById(user._id)
             .populate({
               path: "posts",
               options: { sort: { createdAt: -1 } } // Sort posts by createdAt in descending order
             });
           return {
             ...userWithPosts._doc,
             posts: userWithPosts.posts.map((post) => mapPostOutput(post, req._id)),
           };
         })
       );
   
       const fullPosts = await Post.find({
         owner: {
           $nin: curUser.followings,
         },
       }).populate("owner");
   
       const posts = fullPosts.map((item) => mapPostOutput(item, req._id));
   
       const followingsIds = curUser.followings.map((item) => item._id);
       followingsIds.push(req._id);
   
       const suggestions = await User.find({
         _id: {
           $nin: followingsIds,
         },
       });
   
       return res.send(success(200, { ...curUser._doc, followings: followingsWithPosts, suggestions, posts }));
     } catch (e) {
       return res.send(error(500, e.message));
     }
   };



const getMyPosts = async (req, res) => {
     try {
          const curUserId = req._id;
          const allUserPosts = await Post.find({
               owner: curUserId,
          }).populate("likes");

          return res.send(success(200, { allUserPosts }));
     } catch (error) {
          return res.send(error(500, e.message));
     }
};

const getUserPosts = async (req, res) => {
     try {
          const userId = req.body.userId;
          if (!userId) {
               return res.send(error(400, "userId is required"));
          }

          const allUserPosts = await Post.find({
               owner: userId,
          }).populate("likes");

          return res.send(success(200, { allUserPosts }));
     } catch (e) {
          return res.send(error(500, e.message));
     }
};

const deleteMyProfile = async (req, res) => {
     try {
          const curUserId = req._id;
          const curUser = await User.findById(curUserId);
          await Post.deleteMany({
               owner: curUserId,
          });

          // removed myself from followers' followings
          curUser.followers.forEach(async (followerId) => {
               const follower = await User.findById(followerId);
               const index = follower.followings.indexOf(curUserId);
               follower.followings.splice(index, 1);
               await follower.save();
          });

          // remove myself from my followings' followers
          curUser.followings.forEach(async (followingId) => {
               const following = await User.findById(followingId);
               const index = following.followers.indexOf(curUserId);
               following.followers.splice(index, 1);
               await following.save();
          });

          // remove myself from all likes
          const allPosts = await Post.find();
          allPosts.forEach(async (post) => {
               const index = post.likes.indexOf(curUserId);
               post.likes.splice(index, 1);
               await post.save();
          });

          await curUser.deleteOne({ _id: curUserId });

          res.clearCookie("jwt", {
               httpOnly: true,
               secure: true,
          });

          return res.send(success(200, "user deleted"));
     } catch (e) {
          return res.send(error(500, e.message));
     }
};

const getMyInfo = async (req, res) => {
     try {
          const user = await User.findById(req._id);
          return res.send(success(200, { user }));
     } catch (e) {
          return res.send(error(500, e.message));
     }
};

const updateUserProfile = async (req, res) => {
     try {
          const { avatar, username, bio, website, gender } = req.body;

          const user = await User.findById(req._id);
          if (username) {
               user.username = username;
          }
          if (website) {
               user.website = website;
          }
          if (gender) {
               user.gender = gender;
          }
          if (bio) {
               user.bio = bio;
          }
          
          let imageData = {}
          if (avatar) {
               const results = await uploadCloudinary(avatar, 'socialmediapics');
               imageData = results;
               user.avatar = imageData;
          }
          await user.save();
          return res.send(success(200, { user }));
     } catch (e) {
          return res.send(error(500, e.message));
     }
};

const getUserProfile = async (req, res) => {
     try {
          const userId = req.body.userId;
          const user = await User.findById(userId).populate({
               path: "posts",
               populate: {
                    path: "owner",
               },
          });
          const fullPosts = user.posts;
          const posts = fullPosts
               .map((item) => mapPostOutput(item, req._id))
               .reverse();
          return res.send(success(200, { ...user._doc, posts }));
     } catch (e) {
          return res.send(error(500, e.message));
     }
};

module.exports = {
     followOrUnfollowUserController,
     getPostsOfFollowing,
     getMyPosts,
     getUserPosts,
     deleteMyProfile,
     getMyInfo,
     updateUserProfile,
     getUserProfile,
};