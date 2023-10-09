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
      state.channels = action.payload;
    },
    changeChannel:(state = initialState, action)=>{
      state.currentChannel = action.payload;
    },
    addChannel:(state = initialState, action)=>{
      state.channels.push(action.payload)
    },
    deleteChannel:(state = initialState, action)=>{
      const id = action.payload.id
      console.log(action)
      const filteredChannels = state.channels.filter(el=>el.id!==id)
      state.channels = filteredChannels
        console.log(filteredChannels)
        console.log(state.channels)
     },
     renameChannel:(state = initialState, action)=>{
        const newState =state
       const {id, name} = action.payload
       const newChannels = newState.channels.map(item=>{
        if(item.id ===id)
       return  item = {
        id:item.id,
         name: name,
          removable:true
      }
      return item
      })
       newState.channels = newChannels
      }

  },
});

export const { getAllChannels, changeChannel, addChannel, deleteChannel, renameChannel} = channelSlice.actions;

export default channelSlice.reducer;
