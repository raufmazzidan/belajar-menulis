import { auth } from '@/config/firebase';
import UserDataContext from '@/context/UserData';
import { signOut } from 'firebase/auth';
import { useContext } from 'react';

export const isBeforeLogin = (pathname) => {
  return ['/404', '/register', '/login', '/forgot-password'].includes(pathname);
};

export const getUserData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useContext(UserDataContext);

  return data || {};
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = '/login';
      localStorage.removeItem('user');
    })
    .catch((error) => {
      // An error happened.
    });
};
