import React from 'react';
import { Grid, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const ControlPanel = () => {
  return (
    <Grid justifyContent="space-between" alignItems="center" container>
      <Grid xs item>
        <TextField
          id="outlined-basic"
          label="Поиск"
          variant="outlined"
          fullWidth
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
