import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages1: [],
};
const messagesSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getAllMessages: (state = initialState, action) => {
      state.messages1 = action.payload;
    },
  },
});

export const { getAllMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
