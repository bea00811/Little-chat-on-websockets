import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import LoginContext from '../App.js';

export default function MainPage() {
  const emptylocalStorage = !Object.keys(localStorage).length;
  console.log(emptylocalStorage);
  const navigate = useNavigate();
  const handleClick = () => navigate('/login');
  handleClick();
  const user13 = useContext(LoginContext);
  console.log(user13);
  return (
    <div>
      <h1>MainPage</h1>
    </div>
  );
}
