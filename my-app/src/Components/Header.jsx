import { Link } from 'react-router-dom';
import useAuth from './useAuthContext';
export default function MyHeader (index) {
  const { logOut,loggedIn } = useAuth();
 return(

 <div className='container'>
  <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
    <li>
    <Link to="/">Chat</Link>
    </li>
   {loggedIn&&<li>{'Hello, '+ JSON.parse(localStorage.user).user+ '!'}</li>} 
   {loggedIn&&<li><button onClick={logOut}>LogOut</button></li>} 

  </nav>
 
  </div>
 )

};
  


