import { configureStore } from '@reduxjs/toolkit';
import getChannels from './channelSlice.js';
import getMessages from './messagesSlice.js';
import getModals from './modalSlice.js';

const getAllChannels = getChannels;
const getAllMessages = getMessages;
const getAllModals = getModals;
export default configureStore({
  reducer: {
    channels: getAllChannels,
    messages: getAllMessages,
    modals: getAllModals,
  },
});
