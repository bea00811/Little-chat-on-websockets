import { useNavigate } from 'react-router-dom';

export default function MainPage() {
  console.log(Object.keys(localStorage));
  const navigate = useNavigate();
  const handleClick = () => navigate('/login');
  handleClick();
  return (
    <div>
      <h1>MainPage</h1>
    </div>
  );
}
