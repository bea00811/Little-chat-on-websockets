import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannel: 1,
};
const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getAllChannels: (state = initialState, action) => {
      const newState = state
      newState.channels = action.payload;
    },
  },
});

export const { getAllChannels } = channelSlice.actions;

export default channelSlice.reducer;
