import React, { useEffect } from 'react';
import { Alert, CircularProgress, MenuItem, Paper, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { selectHashtagList, selectHashtagListLoading } from '../../../Hashtag/hashtagSlice';
import { fetchHashtagList } from '../../../Hashtag/hashtagThunk';

const FilterHashtag = () => {
  const hashtags = useAppSelector(selectHashtagList);
  const dispatch = useAppDispatch();
  const loadingHashtag = useAppSelector(selectHashtagListLoading);

  useEffect(() => {
    dispatch(fetchHashtagList());
  }, [dispatch]);

  return (
    <Paper elevation={3}>
      <TextField value="" select label="Выбрать хэштег" sx={{ width: '200px', mr: '10px' }}>
        <MenuItem value="" disabled>
          Фильтровать по:
        </MenuItem>
        <MenuItem value="#">Все#</MenuItem>
        {!loadingHashtag ? (
          hashtags.length !== 0 ? (
            hashtags.map((hashtag) => (
              <MenuItem key={hashtag._id} value={hashtag._id}>
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
