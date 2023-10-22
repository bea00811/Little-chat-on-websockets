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
      const { id } = action.payload;
      newState.currentChannel = id;
    },
    addChannel: (state, action) => {
      const newState = state;
      const { id } = action.payload;
      newState.channels.push(action.payload);
      newState.currentChannel = id;
    },
    deleteChannel: (state, action) => {
      const newState = state;
      const { id } = action.payload;
      const filteredChannels = state.channels.filter((el) => el.id !== id);
      newState.channels = filteredChannels;
      newState.currentChannel = 1;
    },
    renameChannel: (state, action) => {
      const newState = state;
      const { id, name } = action.payload;
      const newChannels = newState.channels.map((item) => {
        const newItem = {
          id: item.id,
          name,
          removable: true,
        };
        if (item.id === id) {
          return newItem;
        }
        return item;
      });
      newState.channels = newChannels;
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
