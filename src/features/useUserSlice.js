import { createSlice } from '@reduxjs/toolkit'
import Emitter from '../Events/Emitter'
import EventName from '../Events/EventName'

const useUserSlice = createSlice({
  name: 'user',
  initialState: {
    UserLoginData: [],
    LoginId: 0,
  },
  reducers: {

    addLoginUser: {
      reducer: (state, action) => {
        
        
          console.log("state = ",state);
          console.log("action = ",action);

          console.log("LoginId = ",action.payload.LoginId);

          state.UserLoginData = action.payload;
          state.LoginId = action.payload.LoginId;

        Emitter.emit(EventName.ALERT_MESSAGE.SUCCESS,{ message: "Success: Login successfully"}); 

      },
    },
    getLoginUser: (state, action) => {
      return {
        ...state,
      }
    },
     
    removeLoginUser: (state, action) => {
      
      state.UserLoginData = [];
      state.LoginId = 0;

    },

      
  },
})

export const {
  addLoginUser,
  removeLoginUser,
  
} = useUserSlice.actions

export default useUserSlice.reducer
