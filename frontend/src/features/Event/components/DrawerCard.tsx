import React, { useState } from 'react';
import { Checkbox, Drawer, FormControlLabel, FormGroup, MenuItem, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDrawer, selectCellTable, selectDrawerState, toggleShowCellTable } from '../store/eventSlice';

const DrawerCard = () => {
  const [col, setCol] = useState('8');
  const cellTables = useAppSelector(selectCellTable);
  const dispatch = useAppDispatch();
  const stateDrawer = useAppSelector(selectDrawerState);

  const toggleShowCell = (id: string) => {
    dispatch(toggleShowCellTable(id));
  };

  return (
    <Drawer
      PaperProps={{
        sx: { width: '10%', p: '10px' },
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
        name="col"
        value={col}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCol(e.target.value)}
        select
        label="Выбрать хэштег"
        required
        sx={{ width: '200px', mr: '10px' }}
      >
        <MenuItem value="" disabled>
          Выберите размер:
        </MenuItem>
        <MenuItem value="1" disabled>
          5
        </MenuItem>
        <MenuItem value="10" disabled>
          10
        </MenuItem>
        <MenuItem value="10" disabled>
          50
        </MenuItem>
        <MenuItem value="10" disabled>
          Макс
        </MenuItem>
      </TextField>
    </Drawer>
  );
};

export default DrawerCard;
