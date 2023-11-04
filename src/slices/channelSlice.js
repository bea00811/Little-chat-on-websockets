import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  currentChannel: 1,
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    getAllChannels: (state, action) => {
      const newState = state;
      newState.channels = action.payload;
    },
    changeChannel: (state, action) => {
      const newState = state;
      console.log(action);
      console.log('action changeChannel');
      newState.currentChannel = action.payload;
    },
    addChannel: (state, action) => {
      const newState = state;
      newState.channels.push(action.payload);
    },
    deleteChannel: (state, action) => {
      const newState = state;
      const { id } = action.payload;
      const filteredChannels = state.channels.filter((el) => el.id !== id);
      newState.channels = filteredChannels;
    },
    renameChannel: (state, action) => {
      const newState = state;
      const { id, name } = action.payload;
      const filteredChannelIndex = newState.channels.findIndex(
        (item) => item.id === id,
      );
      newState.channels[filteredChannelIndex].name = name;
    },
  },
});

export const {
  getAllChannels,
  changeChannel,
  addChannel,
  deleteChannel,
  renameChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
