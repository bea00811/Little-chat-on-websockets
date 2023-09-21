import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  
  
};
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getAllMessages: (state = initialState, action) => {
      state.messages = action.payload;
    },
    sendMessages:(state = initialState, action)=>{
      state.messages.push(action)
    }
  },
});

export const { getAllMessages,sendMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
