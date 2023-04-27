import React from 'react';
import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { closeModal, selectModal } from '../features/Event/eventSlice';

interface Props {
  children: React.ReactNode;
}

const ModalCard: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector(selectModal);

  return (
    <Dialog
      open={modal}
      onClose={() => dispatch(closeModal())}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeModal())}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCard;
