import { configureStore } from '@reduxjs/toolkit';
import getAllChannels1 from './channelSlice.js';
import getAllMessages1 from './messagesSlice.js';
import getAllModals1 from './modalSlice.js';

const getAllChannels = getAllChannels1;
const getAllMessages = getAllMessages1;
const getAllModals = getAllModals1;
export default configureStore({
  reducer: {
    channels: getAllChannels,
    messages: getAllMessages,
    modals: getAllModals,
  },
});
