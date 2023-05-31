import React, { useEffect, useState } from 'react';
import { Checkbox, Drawer, FormControlLabel, FormGroup, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { closeDrawer, createPerPage, selectCellTable, selectDrawerState, toggleShowCellTable } from '../eventSlice';
import FilterCard from '../FilterCard/FilterCard';
import Divider from '@mui/material/Divider';

const DrawerCard = () => {
  const dispatch = useAppDispatch();
  const stateDrawer = useAppSelector(selectDrawerState);
  const cellTablesGlobal = useAppSelector(selectCellTable);
  const [perPage, setPerPage] = useState('');

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
        sx: { p: '10px', maxWidth: '350px' },
      }}
      anchor="left"
      open={stateDrawer}
      onClose={() => dispatch(closeDrawer())}
    >
      <Grid spacing={3} container>
        <Grid xs={12} item>
          <Typography component="p" variant="h6">
            Панель колнок
          </Typography>
          <Divider sx={{ my: 2 }} light />
          <FormGroup>
            {cellTablesGlobal.map((item) => (
              <FormControlLabel
                key={item.id}
                control={<Checkbox onClick={() => toggleShowCell(item.id)} checked={item.show} />}
                label={item.name}
              />
            ))}
          </FormGroup>
        </Grid>
        <Grid xs={12} item>
          <Typography component="p" variant="h6">
            Панель строк
          </Typography>
          <Divider sx={{ my: 2 }} light />
          <TextField
            name="perPage"
            value={perPage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPerPage(e.target.value)}
            select
            required
            sx={{ width: '60px' }}
            variant="standard"
          >
            <MenuItem value="" disabled>
              Выберите число:
            </MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="15">15</MenuItem>
          </TextField>
        </Grid>
        <Grid xs={12} item>
          <Typography component="p" variant="h6">
            Фильтр
          </Typography>
          <Divider sx={{ my: 2 }} light />
          <FilterCard />
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default DrawerCard;
