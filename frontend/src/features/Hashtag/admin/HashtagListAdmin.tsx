import React, { useEffect, useState } from 'react';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectHashtagList, selectHashtagListLoading, selectHashtagOne } from '../hashtagSlice';
import { deleteHashtag, editHashtag, fetchHashtagList, fetchOneHashtag } from '../hashtagThunk';
import CardHashtagAdmin from '../components/CardHashtagAdmin';
import { HashtagMutation } from '../../../types';
import FormHashtag from '../components/FormHashtag';
import SnackbarCard from '../../../components/SnackbarCard';
import ModalCard from '../../../components/ModalCard';
import { closeModal, openModal } from '../../Event/eventSlice';

const HashtagListAdmin = () => {
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const listHashtag = useAppSelector(selectHashtagList);
  const loadingListHashtag = useAppSelector(selectHashtagListLoading);
  const hashtagOne = useAppSelector(selectHashtagOne);

  useEffect(() => {
    dispatch(fetchHashtagList());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(fetchOneHashtag(id));
    }
  }, [dispatch, id]);

  const removeHashtagCard = async (id: string) => {
    if (window.confirm('Вы действительно хотите удалить ?')) {
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
  };

  const onSubmit = async (hashtag: HashtagMutation) => {
    if (id) {
      await dispatch(editHashtag({ hashtag, id })).unwrap();
    }
    await dispatch(fetchHashtagList()).unwrap();
    setId('');
    dispatch(closeModal());
  };

  return (
    <>
      {!loadingListHashtag ? (
        listHashtag.length !== 0 ? (
          listHashtag.map((hashtag) => (
            <CardHashtagAdmin
              setOpenModal={() => setOpenModal(hashtag._id)}
              removeHashtagCard={() => removeHashtagCard(hashtag._id)}
              key={hashtag._id}
              hashtag={hashtag}
            />
          ))
        ) : (
          <Alert severity="info">В данный момент хэштегов нет</Alert>
        )
      ) : (
        <CircularProgress />
      )}

      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
          Хэштег успешно удалён !
        </Alert>
      </Snackbar>

      <SnackbarCard />
      <ModalCard>{hashtagOne && <FormHashtag onSubmit={onSubmit} hashtag={hashtagOne} />}</ModalCard>
    </>
  );
};

export default HashtagListAdmin;
