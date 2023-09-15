export const addChannel = (channel) => ({
  type: 'CHANNEL_ADD',
  payload: {
    channel,
  },
});
