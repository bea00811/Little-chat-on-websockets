import { configureStore } from '@reduxjs/toolkit';
import getAllChannels from './channelSlice.js';
import getAllMessages from './messagesSlice.js';

export default configureStore({
  reducer: {
    channels: getAllChannels,
    messages: getAllMessages,
  },
});
