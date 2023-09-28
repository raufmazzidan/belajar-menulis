import { auth } from '@/config/firebase';
import UserDataContext from '@/context/UserData';
import { getAuth, signOut } from 'firebase/auth';
import { useContext } from 'react';

export const isBeforeLogin = (pathname) => {
  return ['/register', '/login', '/forgot-password'].includes(pathname);
};

export const getUserData = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data } = useContext(UserDataContext);

  return data || {};
};

export const getToken = async () => {
  try {
    const auth = getAuth();
    const token = await auth.currentUser.getIdToken();
    return token;
  } catch (error) {
    return null;
  }
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

export const onFetchError = (action) => (error) => {
  if (error.code === 'permission-denied') {
    logout();
  }

  action(error);
};

export const greetings = () => {
  let myDate = new Date();
  let hours = myDate.getHours();
  let greet;

  if (hours >= 5 && hours < 12) greet = 'Selamat Pagi';
  else if (hours >= 12 && hours <= 15) greet = 'Selamat Siang';
  else if (hours >= 15 && hours <= 18) greet = 'Selamat Sore';
  else greet = 'Selamat Malam';

  return greet;
};
