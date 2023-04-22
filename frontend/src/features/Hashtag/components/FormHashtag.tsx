import React, { useState } from 'react';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import { HashtagMutation } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectCreateHashtagLoading } from '../hashtagSlice';

interface Props {
  onSubmit: (hashtag: HashtagMutation) => void;
  hashtag?: HashtagMutation;
}

const FormHashtag: React.FC<Props> = ({ onSubmit, hashtag }) => {
  const [value, setValue] = useState(hashtag ? hashtag.name : '');
  const createLoading = useAppSelector(selectCreateHashtagLoading);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name: value });
    setValue('');
  };

  return (
    <Box component="form" sx={{ mt: 3 }} onSubmit={onFormSubmit}>
      <Grid container sx={{ flexDirection: 'column' }} spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Название хэштега"
            name="hashtag"
            type="text"
            autoComplete="current-password"
            fullWidth
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button disabled={createLoading} type="submit" variant="contained">
            {!createLoading ? 'Создать хэштег' : <CircularProgress size={20} />}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormHashtag;
