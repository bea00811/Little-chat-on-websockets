import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from './useAuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getAllChannels } from '../slices/channelSlice.js';
import { getAllMessages } from '../slices/messagesSlice.js';
import axios from 'axios';

export default function MainPage() {
  const { loggedIn } = useAuth();
  console.log(loggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      async function getChannels() {
        const serverDataLogUser = await axios.get('/api/v1/data', {
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
        });
        console.log(serverDataLogUser.data);
        dispatch(getAllChannels(serverDataLogUser.data));
        dispatch(getAllMessages(serverDataLogUser.data));
      }
      getChannels();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const channelsData = useSelector((state) => state.channels.channels.channels);
  const messagesData = useSelector((state) => state.messages2.messages1);
  channelsData && channelsData.map((item) => console.log(item));

  console.log(messagesData);
  console.log(localStorage);

  return (
    <div>
      <h1>MainPage</h1>
      <ul>
        {channelsData && channelsData.map((item) => <li>{item.name}</li>)}
      </ul>
    </div>
  );
}
