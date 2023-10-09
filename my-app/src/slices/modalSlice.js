import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel:1
};


const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
      getCurrentChannel: (state = initialState, action) => {
        state.currentChannel = action.payload;
        console.log(state.currentChannel)
        console.log(action)
      },

    },
  });
  
  export const { getCurrentChannel} = modalSlice.actions;
  
  export default modalSlice.reducer;