import React, { useEffect, useState } from 'react';
import { Checkbox, Drawer, FormControlLabel, FormGroup, MenuItem, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  closeDrawer,
  createPerPage,
  selectCellTable,
  selectDrawerState,
  toggleShowCellTable,
} from '../store/eventSlice';

const DrawerCard = () => {
  const [perPage, setPerPage] = useState('');
  const cellTables = useAppSelector(selectCellTable);
  const dispatch = useAppDispatch();
  const stateDrawer = useAppSelector(selectDrawerState);

  const toggleShowCell = (id: string) => {
    dispatch(toggleShowCellTable(id));
  };

  useEffect(() => {
    if (perPage) {
      dispatch(createPerPage(parseInt(perPage)));
    }
  }, [dispatch, perPage]);

  return (
    <Drawer
      PaperProps={{
        sx: { p: '10px' },
      }}
      anchor="left"
      open={stateDrawer}
      onClose={() => dispatch(closeDrawer())}
    >
      <Typography>Панель колнок</Typography>
      <FormGroup>
        {cellTables.map((item) => (
          <FormControlLabel
            onClick={() => toggleShowCell(item.id)}
            key={item.id}
            control={<Checkbox checked={item.show} defaultChecked />}
            label={item.name}
          />
        ))}
      </FormGroup>
      <Typography>Панель строк</Typography>
      <TextField
        name="perPage"
        value={perPage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPerPage(e.target.value)}
        select
        label="Выбрать хэштег"
        required
        sx={{ width: '200px', mr: '10px' }}
      >
        <MenuItem value="" disabled>
          Выберите размер:
        </MenuItem>
        <MenuItem value="0">Сбросить</MenuItem>
        <MenuItem value="5">5</MenuItem>
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="15">15</MenuItem>
      </TextField>
    </Drawer>
  );
};

export default DrawerCard;
