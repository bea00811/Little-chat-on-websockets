import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: 1,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    getCurrentChannel: (state, action) => {
      console.log(action.payload);
      console.log('id proveded in ModalSlice getcurrentChammel');
      const newState = state;
      newState.currentChannel = action.payload;
    },
  },
});

export const { getCurrentChannel } = modalSlice.actions;

export default modalSlice.reducer;
