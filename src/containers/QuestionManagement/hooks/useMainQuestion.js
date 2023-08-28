import { db } from '@/config/firebase';
import useWindowSize from '@/utils/hooks/useWindowSize';
import popup from '@/utils/popup';
import { Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

const useMainQuestion = () => {
  const isMobile = useWindowSize({ type: 'max', limit: 'md' });

  const [data, setData] = useState([]);
  const [active, setActive] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const ref = collection(db, 'question');
    try {
      const response = await getDocs(ref);
      const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(data);
      setLoading(false);
    } catch (error) {
      setData([]);
      setLoading(false);
    }
  };

  const deleteData = (id) => async () => {
    const ref = doc(db, 'question', id);
    try {
      await deleteDoc(ref);
      setActive({ items: [] });
      // getData();
      await popup.closeAll();
      await popup.alert({ type: 'success', message: 'Successfully delete data.' });
    } catch (error) {
      popup.alert({ type: 'error', message: 'Failed delete data.' });
    }
  };

  const onDeleteData = (id) => () => {
    modals.openConfirmModal({
      centered: true,
      title: <Title order={5}>Are you sure want delete your data?</Title>,
      children: <Text size="sm">Please check again carefully. Your data will be deleted once it is submitted.</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: deleteData(id),
    });
  };

  useEffect(() => {
    const ref = collection(db, 'question');
    const q = query(ref, orderBy('level'));
    const getRealtimeData = onSnapshot(
      q,
      (response) => {
        const data = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
      }
    );

    return () => {
      getRealtimeData();
    };
  }, []);

  // useEffect(() => {
  //   getData();
  // }, []);

  return {
    isMobile,
    data,
    active,
    loading,
    onDeleteData,
    setData,
    setActive,
  };
};

export default useMainQuestion;
