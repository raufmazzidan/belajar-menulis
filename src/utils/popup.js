import { modals, closeModal, closeAllModals } from '@mantine/modals';

const loading = () => {
  modals.openContextModal({
    modal: 'loading',
    id: 'loading',
    size: 'xs',
    withCloseButton: false,
  });
};

const alert = ({ type, message }) => {
  closeModal('loading');
  modals.openContextModal({
    modal: 'alert',
    id: 'alert',
    size: 'xs',
    withCloseButton: false,
    innerProps: { type, message },
  });
};

const popup = {
  loading,
  alert,
  closeAll: closeAllModals,
  close: closeModal,
};

export default popup;
