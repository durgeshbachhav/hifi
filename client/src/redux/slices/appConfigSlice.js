import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosClient } from "../../utils/axiosClient";


export const getMyInfo = createAsyncThunk('user/getmyinfo', async (_, thunkAPI) => {
     try {
          const response = await axiosClient.get('/user/get-my-info')
          return response.result;
     } catch (error) {
          return Promise.reject(error)
     }
})

export const createChat = createAsyncThunk('user/createChat',async(body,thunkAPI)=>{
     try {
          const response = await axiosClient.post('/chat/',body)
          return response.result;
     } catch (error) {
          console.log(error);
     }
})



export const updateMyProfile = createAsyncThunk('user/updatemyprofile', async (body, thunkAPI) => {
     try {
          const response = await axiosClient.put('/user/', body)
          return response.result;
     } catch (error) {
          console.log(error);
     }
})



const initialState = {
     toastData:{},
     myProfile: null
}

const appConfigSlice = createSlice({
     name: "appConfigSlice",
     initialState,
     reducers:{
          showToast:(state,action)=>{
                    state.toastData = action.payload;
          }
     },
    
     extraReducers: (builder) => {
          builder.addCase(getMyInfo.fulfilled, (state, action) => {
               state.myProfile = action.payload.user;
          })
               .addCase(updateMyProfile.fulfilled, (state, action) => {
                    state.myProfile = action.payload?.user;
               })
     }
})

export default appConfigSlice.reducer;
export const { showToast } = appConfigSlice.actions;