import { db } from '@/config/firebase';
import useRealtime from '@/utils/hooks/fetch/useRealtime';
import useWindowSize from '@/utils/hooks/useWindowSize';
import popup from '@/utils/popup';
import { Text, Title } from '@mantine/core';
import { modals } from '@mantine/modals';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const useMainQuestion = () => {
  const router = useRouter();
  const isMobile = useWindowSize({ type: 'max', limit: 'md' });

  const { data, setData, loading } = useRealtime({
    reference: query(collection(db, 'question'), orderBy('level')),
  });

  const deleteData = (id) => async () => {
    try {
      await deleteDoc(doc(db, 'question', id));
      // getData();
      router.replace('/question');
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

  const active = useMemo(() => {
    const res = data.find(({ id }) => router.query.id === id);

    return res || { items: [] };
  }, [router.query.id, data]);

  return {
    isMobile,
    data,
    active,
    loading,
    onDeleteData,
    setData,
  };
};

export default useMainQuestion;
