import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";


export const getUserProfile = createAsyncThunk('user/getUserProfile', async (body, thunkAPI) => {
     try {
          const response = await axiosClient.post('/user/get-user-profile', body)
          return response.result;
     } catch (error) {
          return Promise.reject(error)
     }
})
export const likeAndDisliked = createAsyncThunk('user/likeAndDisliked', async (body, thunkAPI) => {
     try {
          const response = await axiosClient.post('/post/likeOrUnlike', body)
          return response.result.post;
     } catch (error) {
          return Promise.reject(error)
     }
})


const postSlice = createSlice({
     name: "postSlice",
     initialState: {
       userProfile: {
         posts: [],
       },
     },
     extraReducers: (builder) => {
       builder
         .addCase(getUserProfile.fulfilled, (state, action) => {
           state.userProfile = action.payload;
         })
         .addCase(likeAndDisliked.fulfilled, (state, action) => {
           const post = action.payload;
           const index = state.userProfile.posts.findIndex((item) => item._id === post._id);
           if (index != undefined && index != -1) {
             state.userProfile.posts[index] = post;
           }
         });
     },
   });
   

export default postSlice.reducer;