import React, { useEffect, useState } from 'react';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectHashtagList, selectHashtagListLoading } from './hashtagSlice';
import { deleteHashtag, fetchHashtagList } from './hashtagThunk';
import CardHashtag from './components/CardHashtag/CardHashtag';

const HashtagList = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const listHashtag = useAppSelector(selectHashtagList);
  const loadingListHashtag = useAppSelector(selectHashtagListLoading);

  useEffect(() => {
    dispatch(fetchHashtagList());
  }, [dispatch]);

  const removeHashtagCard = async (id: string) => {
    await dispatch(deleteHashtag(id)).unwrap();
    await dispatch(fetchHashtagList()).unwrap();
    setOpen(true);
  };

  return (
    <>
      {!loadingListHashtag ? (
        listHashtag.length !== 0 ? (
          listHashtag.map((hashtag) => (
            <CardHashtag removeHashtagCard={() => removeHashtagCard(hashtag._id)} key={hashtag._id} hashtag={hashtag} />
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
    </>
  );
};

export default HashtagList;
