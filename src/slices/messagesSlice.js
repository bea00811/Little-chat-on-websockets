import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    getAllMessages: (action, state = initialState) => {
      const newState = state;
      newState.messages = action.payload;
    },
    sendMessages: (action, state = initialState) => {
      const newState = state;
      newState.messages.push(action.payload);
    },
    removeChannelMessages: (state, action) => {
      const newState = state;
      const { id } = action.payload;
      const filteredMessages = state.messages.filter(
        (el) => el.channelId !== id,
      );
      newState.messages = filteredMessages;
    },
  },
});

export const { getAllMessages, sendMessages, removeChannelMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
