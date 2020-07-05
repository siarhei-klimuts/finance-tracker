import {
  createContext, useContext,
} from 'react';

import { useRequest } from 'lib/data';

const AuthContext = createContext({
  state: {
    user: null,
  },
});

function AuthProvider(props) {
  const { data: user } = useRequest('/api/user');

  const value = {
    state: {
      user,
    },
    actions: {
    },
  };

  return (
    <AuthContext.Provider
      value={value}
      {...props}
    />
  );
}

const useAuthContext = () => useContext(AuthContext);
const useData = () => useAuthContext().state;

const useUser = () => useData().user;

const useActions = () => useAuthContext().actions;

export default AuthProvider;
export {
  useUser,
  useActions,
};
