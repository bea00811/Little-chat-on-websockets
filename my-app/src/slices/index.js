import { configureStore } from '@reduxjs/toolkit';
import getAllChannels from './channelSlice.js';

export default configureStore({
  reducer: {
    channels: getAllChannels,
  },
});
