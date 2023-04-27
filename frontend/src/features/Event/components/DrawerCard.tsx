import React from 'react';
import { Checkbox, Drawer, FormControlLabel, FormGroup, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDrawer, selectCellTable, selectDrawerState, toggleShowCellTable } from '../store/eventSlice';

const DrawerCard = () => {
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
    </Drawer>
  );
};

export default DrawerCard;
