import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from './useAuthContext';
import { useSelector, useDispatch } from 'react-redux';
import { getAllChannels } from '../slices/channelSlice.js';
import axios from 'axios';

export default function MainPage() {
  console.log(Object.keys(localStorage));
  const { loggedIn } = useAuth();
  // Состояние доступно внутри за счет обычной области видимости
  console.log(loggedIn);
  const dispatch = useDispatch();

  async function getChannels() {
    const respLogin = await axios.get('/api/v1/data', {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    console.log(respLogin.data);
    dispatch(getAllChannels(respLogin.data));
  }
  getChannels();

  const channelsData = useSelector((state) => state.channels.channels);
  console.log(channelsData.channels);

  const navigate = useNavigate();
  const handleClick = () => navigate('/login');
  handleClick();
  return (
    <div>
      <h1>MainPage</h1>
    </div>
  );
}
