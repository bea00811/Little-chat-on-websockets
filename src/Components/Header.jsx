import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from './useAuthContext';

const MyHeader = () => {
  const { logOut, loggedIn } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="container px-0">
      <nav className="px-4 shadow-sm navbar navbar-expand-lg navbar-light bg-white d-flex justify-content-between">
        <li>
          <Link to="/">My little Chat</Link>
        </li>
        {loggedIn && <li>{`Hello, ${JSON.parse(localStorage.user).user}!`}</li>}
        {loggedIn && (
          <li>
            <button
              type="button"
              className="submit-btn"
              onClick={() => {
                logOut();
                navigate('/login');
              }}
            >
              {t('LogOut')}
            </button>
          </li>
        )}
      </nav>
    </div>
  );
};

export default MyHeader;
