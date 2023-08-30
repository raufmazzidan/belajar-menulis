import React, { createContext, useEffect, useState } from 'react';
const UserDataContext = createContext({
  data: null,
});

const Provider = UserDataContext.Provider;

export const UserDataProvider = (props) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'));
    setUserData(data);
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
