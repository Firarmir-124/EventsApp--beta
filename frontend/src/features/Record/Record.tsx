import React, { useState } from 'react';
import ModalCard from '../../components/ModalCard';
import { Button, Grid, TextField } from '@mui/material';
import ReactInputMask from 'react-input-mask';
import { RecordUser } from '../../types';

const Record = () => {
  const [value, setValue] = useState<RecordUser>({
    phone: '',
    description: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ModalCard>
      <Grid container component="form" spacing={2}>
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
          <Button variant="outlined">Отправить запрос</Button>
        </Grid>
      </Grid>
    </ModalCard>
  );
};

export default Record;
