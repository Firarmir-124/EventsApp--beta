import React, { useEffect, useState } from 'react';
import { Alert, CircularProgress, MenuItem, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectHashtagList, selectHashtagListLoading } from '../../Hashtag/hashtagSlice';
import { fetchHashtagList } from '../../Hashtag/hashtagThunk';
import { addHashtagToFilterObj, selectObjFilterU } from '../eventSlice';

const FilterHashtag = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();
  const hashtags = useAppSelector(selectHashtagList);
  const loadingHashtag = useAppSelector(selectHashtagListLoading);
  const objFilterU = useAppSelector(selectObjFilterU);

  useEffect(() => {
    dispatch(fetchHashtagList());
  }, [dispatch]);

  useEffect(() => {
    if (value) {
      dispatch(addHashtagToFilterObj(value));
    }
  }, [dispatch, value]);

  console.log(objFilterU);

  return (
    <TextField
      name="hashtag"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      select
      label="Выбрать хэштег"
      required
      sx={{ width: '200px', mr: '10px' }}
    >
      <MenuItem value="" disabled>
        Выберите хэштег:
      </MenuItem>
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
  );
};

export default FilterHashtag;
