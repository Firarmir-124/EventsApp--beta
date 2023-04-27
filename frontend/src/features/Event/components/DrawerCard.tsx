import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Drawer, FormControlLabel, FormGroup, MenuItem, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  closeDrawer,
  createPerPage,
  getSettingLocal,
  saveSettingLocal,
  selectCellTable,
  selectDrawerState,
  selectSettingsLocal,
  toggleShowCellTable,
} from '../eventSlice';

const DrawerCard = () => {
  const dispatch = useAppDispatch();
  const stateDrawer = useAppSelector(selectDrawerState);
  const cellTablesGlobal = useAppSelector(selectCellTable);
  const cellTablesLocal = useAppSelector(selectSettingsLocal);
  const [perPage, setPerPage] = useState('');

  const toggleShowCell = (id: string) => {
    dispatch(toggleShowCellTable(id));
  };

  useEffect(() => {
    if (perPage) {
      dispatch(createPerPage(parseInt(perPage)));
    }
  }, [dispatch, perPage]);

  useEffect(() => {
    dispatch(getSettingLocal());
  }, [dispatch]);

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
        {cellTablesLocal.length !== 0
          ? cellTablesLocal.map((item) => (
              <FormControlLabel
                key={item.id}
                control={<Checkbox onClick={() => toggleShowCell(item.id)} checked={item.show} />}
                label={item.name}
              />
            ))
          : cellTablesGlobal.map((item) => (
              <FormControlLabel
                key={item.id}
                control={<Checkbox onClick={() => toggleShowCell(item.id)} checked={item.show} />}
                label={item.name}
              />
            ))}
      </FormGroup>
      <Button onClick={() => dispatch(saveSettingLocal())} sx={{ mt: '10px' }} variant="outlined">
        Сохранить настройки колонок
      </Button>
      <Typography>Панель строк</Typography>
      <TextField
        name="perPage"
        value={perPage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPerPage(e.target.value)}
        select
        required
        sx={{ width: '60px' }}
      >
        <MenuItem value="" disabled>
          Выберите число:
        </MenuItem>
        <MenuItem value="8">8</MenuItem>
        <MenuItem value="10">10</MenuItem>
        <MenuItem value="15">15</MenuItem>
      </TextField>
    </Drawer>
  );
};

export default DrawerCard;
