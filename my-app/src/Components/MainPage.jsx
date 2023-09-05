import { useNavigate } from 'react-router-dom';

const testPrettier = { mensagem: 'isso é um teste do prettier' };
console.log(testPrettier);

export default function MainPage() {
  const emptylocalStorage = !Object.keys(localStorage).length;
  console.log(emptylocalStorage);
  const navigate = useNavigate();
  const handleClick = () => navigate('/login');
  handleClick();
  return (
    <div>
      <h1>MainPage</h1>
    </div>
  );
}
