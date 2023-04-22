import React, { useEffect, useState } from 'react';
import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectHashtagList, selectHashtagListLoading, selectHashtagOne } from '../hashtagSlice';
import { deleteHashtag, editHashtag, fetchHashtagList, fetchOneHashtag } from '../hashtagThunk';
import CardHashtagAdmin from '../components/CardHashtagAdmin';
import { HashtagMutation } from '../../../types';
import FormHashtag from '../components/FormHashtag';
import SnackbarCard from '../../../components/SnackbarCard';

const HashtagListAdmin = () => {
  const [id, setId] = useState('');
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
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
    await dispatch(deleteHashtag(id)).unwrap();
    await dispatch(fetchHashtagList()).unwrap();
    setOpen(true);
  };

  const closeModal = () => {
    setModal(false);
    setId('');
  };

  const setOpenModal = (id: string) => {
    setModal(true);
    setId(id);
  };

  const onSubmit = async (hashtag: HashtagMutation) => {
    if (id) {
      await dispatch(editHashtag({ hashtag, id })).unwrap();
    }
    await dispatch(fetchHashtagList()).unwrap();
    setId('');
    setModal(false);
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

      <Dialog
        open={modal}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>{hashtagOne && <FormHashtag onSubmit={onSubmit} hashtag={hashtagOne} />}</DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Закрыть</Button>
        </DialogActions>
      </Dialog>
      <SnackbarCard />
    </>
  );
};

export default HashtagListAdmin;
