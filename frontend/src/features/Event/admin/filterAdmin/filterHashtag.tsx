import React, { useEffect } from 'react';
import { Alert, CircularProgress, MenuItem, Paper, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectHashtagList, selectHashtagListLoading } from '../../../Hashtag/hashtagSlice';
import { fetchHashtagList } from '../../../Hashtag/hashtagThunk';
import { addIdHashtag } from '../../store/eventSlice';

const FilterHashtag = () => {
  const hashtags = useAppSelector(selectHashtagList);
  const dispatch = useAppDispatch();
  const loadingHashtag = useAppSelector(selectHashtagListLoading);

  useEffect(() => {
    dispatch(fetchHashtagList());
  }, [dispatch]);

  const handleClick = (id: string) => {
    dispatch(addIdHashtag(id));
  };

  return (
    <Paper elevation={3}>
      <TextField value="" select label="Выбрать хэштег" sx={{ width: '200px', mr: '10px' }}>
        <MenuItem value="" disabled>
          Фильтровать по:
        </MenuItem>
        <MenuItem value="#" onClick={() => handleClick('')}>
          Все#
        </MenuItem>
        {!loadingHashtag ? (
          hashtags.length !== 0 ? (
            hashtags.map((hashtag) => (
              <MenuItem onClick={() => handleClick(hashtag._id)} key={hashtag._id} value={hashtag._id}>
                {hashtag.name}
              </MenuItem>
            ))
          ) : (
            <Alert severity="info">Список пуст</Alert>
          )
        ) : (
          <CircularProgress />
        )}
      </TextField>
    </Paper>
  );
};

export default FilterHashtag;
