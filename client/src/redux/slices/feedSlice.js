import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";
import { likeAndDisliked } from "./postSlice";

export const getFeedData = createAsyncThunk('post/getFeedData', async (_) => {
     try {
          const response = await axiosClient.get('/user/get-post-of-followings')
          return response.result;

     } catch (error) {
          console.log(error);
     }
})


// this is done
export const followAndUnfollowUser = createAsyncThunk('post/followandunfollow', async (body) => {
     try {
          const response = await axiosClient.post('/user/follow-or-unfollow', body)
          return response.result.user;
     } catch (error) {
          return Promise.reject(error)

     }
})


const initialState = {
     feedData: {},
}
const feedSlice = createSlice({
     name: 'feedSlice',
     initialState,
     extraReducers: (builder) => {
          builder.addCase(getFeedData.fulfilled, (state, action) => {
               state.feedData = action.payload;
          }).addCase(likeAndDisliked.fulfilled, (state, action) => {
               const post = action.payload;

               const index = state?.feedData?.posts?.findIndex((item) => item._id === post._id);
               if (index != undefined && index != -1) {
                    state.feedData.posts[index] = post;
               }
          }).addCase(followAndUnfollowUser.fulfilled, (state, action) => {
               const user = action.payload;
               const index = state?.feedData?.followings?.findIndex(item => item._id === user._id)
               if (index != undefined && index != -1) {
                    state?.feedData?.followings?.splice(index, 1);
               } else {
                    state?.feedData?.followings?.push(user);
               }
          })
     }
})

export default feedSlice.reducer;