import React, { useEffect, useState } from 'react';
import { Alert, Box, Skeleton, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectHashtagErrorError,
  selectHashtagList,
  selectHashtagListLoading,
  selectHashtagOne,
  selectHashtagOneLoading,
} from '../hashtagSlice';
import { deleteHashtag, editHashtag, fetchHashtagList, fetchOneHashtag } from '../hashtagThunk';
import CardHashtagAdmin from '../components/CardHashtagAdmin';
import { HashtagMutation } from '../../../types';
import FormHashtag from '../components/FormHashtag';
import SnackbarCard from '../../../components/SnackbarCard';
import ModalCard from '../../../components/ModalCard';
import { closeModal, openModal } from '../../Event/eventSlice';
import useConfirm from '../../../components/Dialogs/Confirm/useConfirm';

const HashtagListAdmin = () => {
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const listHashtag = useAppSelector(selectHashtagList);
  const loadingListHashtag = useAppSelector(selectHashtagListLoading);
  const hashtagOne = useAppSelector(selectHashtagOne);
  const loadingHashtagOne = useAppSelector(selectHashtagOneLoading);
  const removeError = useAppSelector(selectHashtagErrorError);
  const { confirm } = useConfirm();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchHashtagList());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneHashtag(id));
    }
  }, [dispatch, id]);

  const removeHashtagCard = async (id: string) => {
    if (await confirm('Уведомление', 'Вы действительно хотите удалить ?')) {
      await dispatch(deleteHashtag(id)).unwrap();
      await dispatch(fetchHashtagList()).unwrap();
      setOpen(true);
    } else {
      return;
    }
  };

  const setOpenModal = (id: string) => {
    dispatch(openModal());
    setId(id);
    setIsEdit(true);
  };

  const onSubmit = async (hashtag: HashtagMutation) => {
    if (id) {
      await dispatch(editHashtag({ hashtag, id })).unwrap();
      setIsEdit(false);
    }
    await dispatch(fetchHashtagList()).unwrap();
    setId('');
    dispatch(closeModal());
  };

  return (
    <>
      {removeError && <Alert severity="error">{removeError.error}</Alert>}
      {listHashtag.length !== 0 ? (
        listHashtag.map((hashtag) =>
          !loadingListHashtag ? (
            <CardHashtagAdmin
              setOpenModal={() => setOpenModal(hashtag._id)}
              removeHashtagCard={() => removeHashtagCard(hashtag._id)}
              key={hashtag._id}
              hashtag={hashtag}
            />
          ) : (
            <Box key={hashtag._id} sx={{ mt: 2 }}>
              <Skeleton sx={{ mb: 2 }} variant="rectangular" height={50} />
            </Box>
          ),
        )
      ) : (
        <Alert sx={{ mt: 2 }} severity="info">
          В данный момент список пуст
        </Alert>
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Хэштег успешно удалён !
        </Alert>
      </Snackbar>

      <SnackbarCard />
      <ModalCard>
        {hashtagOne &&
          (!loadingHashtagOne ? (
            <FormHashtag onSubmit={onSubmit} hashtag={hashtagOne} isEdit={isEdit} />
          ) : (
            <Skeleton variant="rectangular" width={210} height={60} />
          ))}
      </ModalCard>
    </>
  );
};

export default HashtagListAdmin;
