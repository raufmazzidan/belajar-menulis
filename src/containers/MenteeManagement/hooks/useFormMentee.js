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
import { getUserData } from '@/utils/common';

const useFormMentee = () => {
  const router = useRouter();
  const isMobile = useWindowSize({ type: 'max', limit: 'md' });
  const user = getUserData();

  const isEdit = router.query.id;

  const form = useForm({
    initialValues: {
      fullName: '',
      email: '',
    },
    validate: validate,
    validateInputOnChange: true,
  });

  const submitData = (value) => async () => {
    popup.loading();
    if (isEdit) {
      fetch(`/api/user/${router.query.id}`, {
        headers: { Authorization: user.accessToken },
        method: 'PUT',
        body: JSON.stringify({
          ...value,
          lastUpdate: new Date().toJSON(),
        }),
        contentType: 'application/json',
      })
        .then(() => {
          router.push('/mentee');
          popup.closeAll();
          popup.alert({ type: 'success', message: 'Successfully edit user.' });
        })
        .catch(() => {
          popup.alert({ type: 'error', message: 'Failed edit user.' });
        });
    } else {
      fetch('/api/user', {
        headers: { Authorization: user.accessToken },
        method: 'POST',
        body: JSON.stringify({
          ...value,
          role: 'mentee',
          mentor: user.uid,
          createdDate: new Date().toJSON(),
          lastUpdate: '',
        }),
        contentType: 'application/json',
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            router.push('/mentee');
            popup.closeAll();
            popup.alert({ type: 'success', message: 'Successfully create user.' });
          } else {
            popup.closeAll();
            throw new Error(response.message);
          }
        })
        .catch((error) => {
          popup.alert({ type: 'error', message: error.message || 'Failed create user.' });
        });
    }
  };

  const onSubmit = (val) => {
    modals.openConfirmModal({
      centered: true,
      title: 'Are you sure with your data?',
      children: <Text size="sm">Please check again carefully. Your data will be processed once it is submitted.</Text>,
      labels: { confirm: 'Confirm', cancel: 'Check Again' },
      onConfirm: submitData(val),
    });
  };

  const getData = async () => {
    const ref = doc(db, 'user', router.query.id);
    try {
      const response = await getDoc(ref);
      const data = response.data();
      form.setValues({
        email: data.email,
        fullName: data.fullName,
        password: data.pin,
      });
    } catch (error) {}
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

export default useFormMentee;
