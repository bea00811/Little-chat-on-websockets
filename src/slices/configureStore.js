import { configureStore } from '@reduxjs/toolkit';
import getAllChannels from './channelSlice.js';
import getAllMessages from './messagesSlice.js';
import getAllModals from './modalSlice.js';

export default configureStore({
  reducer: {
    channels: getAllChannels,
    messages: getAllMessages,
    modals: getAllModals,
  },
});
