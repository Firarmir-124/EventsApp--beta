import React, { useRef, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  label: string;
  error?: boolean;
}

const FileInput: React.FC<Props> = ({ onChange, name, label, error }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [filename, setFilename] = useState('');

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <>
      <input style={{ display: 'none' }} type="file" name={name} onChange={onFileChange} ref={inputRef} />

      <Grid container direction="row" spacing={2} alignItems="center" style={{ width: '300px' }}>
        <Grid item xs>
          <TextField disabled label={label} value={filename} onClick={activateInput} error={error} />
        </Grid>

        <Grid item>
          <Button variant="contained" onClick={activateInput}>
            Browse
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
