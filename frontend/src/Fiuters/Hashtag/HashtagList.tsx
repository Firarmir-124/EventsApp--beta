import React, { useEffect } from 'react';
import { Alert, CircularProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectHashtagList, selectHashtagListLoading } from './hashtagSlice';
import { fetchHashtagList } from './hashtagThunk';
import CardHashtag from './components/CardHashtag/CardHashtag';

const HashtagList = () => {
  const dispatch = useAppDispatch();
  const listHashtag = useAppSelector(selectHashtagList);
  const loadingListHashtag = useAppSelector(selectHashtagListLoading);

  useEffect(() => {
    dispatch(fetchHashtagList());
  }, [dispatch]);

  return (
    <>
      {!loadingListHashtag ? (
        listHashtag.length !== 0 ? (
          listHashtag.map((hashtag) => <CardHashtag key={hashtag._id} hashtag={hashtag} />)
        ) : (
          <Alert severity="info">В данный момент хэштегов нет</Alert>
        )
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default HashtagList;
