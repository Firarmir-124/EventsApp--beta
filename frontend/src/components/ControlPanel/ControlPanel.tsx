import React from 'react';
import { Grid, IconButton, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ControlPanel = () => {
  return (
    <Grid justifyContent="space-between" alignItems="center" container>
      <Grid item>
        <TextField select label="Выбрать" required sx={{ width: '200px' }}>
          <MenuItem value="" disabled>
            Выберите параметр:
          </MenuItem>
          <MenuItem>Please select a category</MenuItem>
          <MenuItem>Please select a category</MenuItem>
        </TextField>
      </Grid>
      <Grid item>
        <TextField
          id="outlined-basic"
          label="Поиск"
          variant="outlined"
          InputProps={{
            endAdornment: (
              <IconButton edge="end" color="primary">
                <SearchIcon />
              </IconButton>
            ),
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ControlPanel;
