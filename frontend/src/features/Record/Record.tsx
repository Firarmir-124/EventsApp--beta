import React, { useState } from 'react';
import ModalCard from '../../components/ModalCard';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import ReactInputMask from 'react-input-mask';
import { RecordUser } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectPostRecordUserLoading } from './recordSlice';
import { postRecordUser } from './recordThunk';
import { closeModal, openSnackbar } from '../Event/eventSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Record = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPostRecordUserLoading);
  const [value, setValue] = useState<RecordUser>({
    phone: '',
    description: '',
  });
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const obj = {
      ...value,
      event: id,
    };
    await dispatch(postRecordUser(obj)).unwrap();
    dispatch(openSnackbar({ status: true, parameter: 'create_record_user' }));
    dispatch(closeModal());
    navigate('/profile/request');
  };

  return (
    <ModalCard>
      <Box component="form" onSubmit={onSubmit}>
        <Grid container spacing={2}>
          <Grid xs={12} item>
            <ReactInputMask mask="+996 999 999 999" value={value.phone} onChange={onChange}>
              <TextField
                required
                label="Номер телефона"
                id="outlined-start-adornment"
                sx={{ width: '25ch' }}
                name="phone"
                onChange={onChange}
                value={value.phone}
              ></TextField>
            </ReactInputMask>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="standard-multiline-static"
              label="Информация о себе"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              name="description"
              onChange={onChange}
              value={value.description}
            />
          </Grid>
          <Grid item xs={12}>
            <Button disabled={loading} variant="outlined" type="submit">
              {!loading ? 'Отправить запрос' : <CircularProgress />}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </ModalCard>
  );
};

export default Record;
