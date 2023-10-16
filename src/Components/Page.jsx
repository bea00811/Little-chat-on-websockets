import { Link } from 'react-router-dom';

const BuildPage = (index) => (
    <>
      <h3>Page {index}</h3>
      <div>
        Page {index} content: lalala
      </div>
      <nav>
    <ul>
      <li>
        <Link to="/one">Page One</Link>
      </li>
      <li>
        <Link to="/two">Page Two</Link>
      </li>
    </ul>
  </nav>
    </>
  );
  
  export const PageOne = () => BuildPage(1);
  export const PageTwo = () => BuildPage(2);
  export const ErrorPage = () => BuildPage(404);