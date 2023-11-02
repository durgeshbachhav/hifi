const User = require("../models/User");
const bcrypt = require('bcrypt')
const { error, success } = require("../utils/responseWrapper");
const jwt = require('jsonwebtoken')
const Signup = async (req, res) => {
     try {
          const { username, email, password } = req.body;
          if (!username || !email || !password) {
               return res.send(400, error('all feilds are required'))
          }
          const olduser = await User.findOne({ email })
          if (olduser) {
               return res.send(404, error('user already exist'))
          }
          const hash = await bcrypt.hash(password, 10);
          const newUser = await User.create({
               username,
               email,
               password: hash
          })
          return res.send(success(200, 'User successfully created'))
     } catch (e) {
          return res.send(error(500, e.message))
     }
}
const Login = async (req, res) => {
     try {
          const { email, password } = req.body;
          if (!email || !password) {
               return res.send(400, error('Please fill in all the required fields'))
          }
          const user = await User.findOne({ email }).select('+password')
          if (!user) {
               return res.send(400, error('Sorry, the user you are searching for is not in our records'))
          }
          const isMatched = await bcrypt.compare(password, user.password)
          if (!isMatched) {
               return res.send(404, error('Your password is wrong'))
          }
          // res.send(200,success('user login successfully'))
          const accessToken = generateAccessToken({ _id: user._id })
          // access token jayega localstorage mein 
          const refreshToken = generateRefreshToken({ _id: user._id })
          // refresh token jayega cookie mein using httponly cookie

          // is tarah backend ne frontend ko cookie send kar di
          res.cookie('jwt', refreshToken, {
               httpOnly: true,
               secure: true,
          })
          return res.send(success(200, { accessToken }))
     } catch (e) {
          return res.send(error(500, e.message))
     }
}
const generateAccessToken = (data) => {
     try {
          const token = jwt.sign(data, process.env.ACCESS_TOKEN_KEY, {
               expiresIn: '1d'
          })
          return token;

     } catch (error) {
          console.log('ACESS token ===>', error);
     }
}
const generateRefreshToken = (data) => {
     try {
          const token = jwt.sign(data, process.env.REFRESH_TOKEN_KEY, {
               expiresIn: '30d'
          })
          return token;
     } catch (error) {
          console.log('REFRESH token ', error);
     }
}
// this api will check the refreshtoken validity
const refreshAccessTokenController = async (req, res) => {
     const cookies = req.cookies;
     if (!cookies.jwt) {
          return res.send(400, error('refresh token in cookie is required'))
     }
     const refreshToken = cookies.jwt;
     try {
          const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY)
          const _id = decoded._id;
          const accessToken = generateAccessToken({ _id })
          return res.send(success(200, { accessToken }))
     } catch (e) {
          return res.send(500, error("invalid refresh key"))
     }
}
const logoutController = async (req, res) => {
     try {
          res.clearCookie('jwt', {
               httpOnly: true,
               secure: true,
          })
          return res.send(success(200, 'user logged out'))
     } catch (e) {
          return res.send(error(500, e.message));
     }
}
module.exports = {
     Signup,
     Login,
     refreshAccessTokenController,
     logoutController
}