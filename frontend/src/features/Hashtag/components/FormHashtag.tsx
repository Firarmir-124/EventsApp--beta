import React, { useState } from 'react';
import { Box, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { HashtagMutation } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectCreateHashtagLoading, selectEditHashtagLoading, selectHashtagError } from '../hashtagSlice';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  onSubmit: (hashtag: HashtagMutation) => void;
  hashtag?: HashtagMutation;
  isEdit?: boolean;
}

const FormHashtag: React.FC<Props> = ({ onSubmit, hashtag, isEdit }) => {
  const [value, setValue] = useState(hashtag ? hashtag.name : '');
  const createLoading = useAppSelector(selectCreateHashtagLoading);
  const loadingEdit = useAppSelector(selectEditHashtagLoading);
  const error = useAppSelector(selectHashtagError);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: value });
    setValue('');
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  return (
    <Box component="form" sx={{ mt: 3 }} onSubmit={onFormSubmit}>
      <Grid alignItems="center" container>
        <Grid item xs={9}>
          <TextField
            label="Название хэштега"
            name="hashtag"
            type="text"
            autoComplete="current-password"
            fullWidth
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            error={Boolean(getFieldError('hashtag'))}
            helperText={getFieldError('hashtag')}
          />
        </Grid>
        <Grid xs={3} item>
          {isEdit ? (
            <IconButton type="submit" disabled={loadingEdit}>
              {!loadingEdit ? <EditIcon sx={{ fontSize: '40px' }} /> : <CircularProgress size={40} />}
            </IconButton>
          ) : (
            <IconButton type="submit" disabled={createLoading}>
              {!createLoading ? <AddCircleOutlineIcon sx={{ fontSize: '40px' }} /> : <CircularProgress size={40} />}
            </IconButton>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormHashtag;
