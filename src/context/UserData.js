import { auth } from '@/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
const UserDataContext = createContext({
  data: null,
});

const Provider = UserDataContext.Provider;

export const UserDataProvider = (props) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({ ...user, ...data });
        console.log(user);
      } else {
        setUserData(null);
      }
    });
  }, []);

  return (
    <Provider
      value={{
        data: userData,
        setUserData: setUserData,
      }}
    >
      {props.children}
    </Provider>
  );
};

export default UserDataContext;
