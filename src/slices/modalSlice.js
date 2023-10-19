import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: 1,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    getCurrentChannel: (action, state = initialState) => {
      const newState = state;
      newState.currentChannel = action.payload;
    },
  },
});

export const { getCurrentChannel } = modalSlice.actions;

export default modalSlice.reducer;
