import React from 'react';
import { Autocomplete, Grid, TextField } from '@mui/material';

const ControlPanel = () => {
  const options = ['Option 1', 'Option 2'];
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Grid justifyContent="space-between" alignItems="center" container>
      <Grid xs item>
        <Autocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Controllable" />}
        />
      </Grid>
    </Grid>
  );
};

export default ControlPanel;
