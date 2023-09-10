import { useContext } from 'react';

import authContext from './CreateContext';

const useAuth = () => useContext(authContext);

export default useAuth;
