import { Title, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { addDoc, collection, doc, getDoc, query, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useRouter } from 'next/router';
import popup from '@/utils/popup';
import useWindowSize from '@/utils/hooks/useWindowSize';
import validate from '../utils/validate';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

const useFormQuestion = () => {
  const router = useRouter();
  const isMobile = useWindowSize({ type: 'max', limit: 'md' });

  const isEdit = router.query.id;

  const form = useForm({
    initialValues: {
      item: [
        {
          question: '',
        },
      ],
    },
    validate: validate,
    validateInputOnChange: true,
  });

  const submitData = (value) => async () => {
    popup.loading();
    if (isEdit) {
      const payload = {
        items: value.item.map(({ question }) => ({ question, answer: question })),
        title: value.title,
        type: value.type,
        lastUpdate: new Date().toJSON(),
      };
      const ref = doc(db, 'question', router.query.id);
      try {
        await updateDoc(ref, payload);
        router.push({
          pathname: '/question',
          query: {
            id: router.query.id,
          },
        });
        await popup.closeAll();
        await popup.alert({ type: 'success', message: 'Successfully update data.' });
      } catch (error) {
        popup.alert({ type: 'error', message: 'Failed update data.' });
      }
    } else {
      const payload = {
        items: value.item.map(({ question }) => ({ question, answer: question })),
        title: value.title,
        type: value.type,
        createdDate: new Date().toJSON(),
        lastUpdate: '',
        level: 99,
      };

      const ref = collection(db, 'question');
      try {
        await addDoc(ref, payload);
        router.push('/question');
        await popup.closeAll();
        await popup.alert({ type: 'success', message: 'Successfully submit data.' });
      } catch (error) {
        popup.alert({ type: 'error', message: 'Failed submit data.' });
      }
    }
  };

  const onSubmit = (val) => {
    modals.openConfirmModal({
      centered: true,
      title: <Title order={5}>Are you sure with your data?</Title>,
      children: <Text size="sm">Please check again carefully. Your data will be processed once it is submitted.</Text>,
      labels: { confirm: 'Confirm', cancel: 'Check Again' },
      onConfirm: submitData(val),
    });
  };

  const getData = async () => {
    const ref = doc(db, 'question', router.query.id);
    try {
      const response = await getDoc(ref);
      const data = response.data();
      form.setValues({
        type: data.type,
        title: data.title,
        item: data.items.map(({ question }) => ({ question })),
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit && router.isReady) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, router.isReady]);

  return {
    form,
    isEdit,
    onSubmit,
    isMobile,
  };
};

export default useFormQuestion;
