import { Link } from 'react-router-dom';
import useAuth from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export default function MyHeader (props) {
  const { logOut,loggedIn } = useAuth();
  const navigate = useNavigate();
 return(

 <div className='container '>
  <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white d-flex justify-content-between'>
    <li>
    <Link to="/">Chat</Link>
    </li>
   {loggedIn&&<li>{'Hello, '+ JSON.parse(localStorage.user).user+ '!'}</li>} 
   {loggedIn&&<li><button onClick={()=>{logOut(); navigate('/login')}}>LogOut</button></li>} 

  </nav>
 
  </div>
 )

};
  


