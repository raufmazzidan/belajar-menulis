import { onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useRealtime = ({ reference, onSuccess, onError }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRealtimeData = onSnapshot(
      reference,
      (response) => {
        const data = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
        setLoading(false);
        if (onSuccess) {
          onSuccess(response);
        }
      },
      (error) => {
        if (onError) {
          onError(error);
        }
        setLoading(false);
      }
    );

    return () => {
      getRealtimeData();
    };
  }, []);

  return {
    data,
    loading,
    data,
    setData,
    setLoading,
  };
};

export default useRealtime;
