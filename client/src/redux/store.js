import { configureStore } from '@reduxjs/toolkit';
import appConfigReducer from './slices/appConfigSlice'
import userProfileReducer from './slices/postSlice'
import feedReducer from './slices/feedSlice'

export default configureStore({
  reducer: {
    appConfig: appConfigReducer,
    userProfile: userProfileReducer,
    feedData:feedReducer
  },
});
