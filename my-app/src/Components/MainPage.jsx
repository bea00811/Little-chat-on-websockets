import { useNavigate } from 'react-router-dom';

// export const MainPage= () => (
//     <div>
// <h1>MainPage</h1>
// </div>
// );

export default function MainPage() {
  const emptylocalStorage = !Object.keys(localStorage).length
console.log(emptylocalStorage)
const navigate = useNavigate(); 
const handleClick = () => navigate('/login');
handleClick();
  return (
    <div> 
      <h1>MainPage</h1>
    </div>
 
  )
}
