import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../constants';
import { Button, ButtonGroup } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';

const RequestCardAdmin = () => {
  return (
    <StyledTableRow>
      <StyledTableCell align="center">Дима</StyledTableCell>
      <StyledTableCell align="center">0555234009</StyledTableCell>
      <StyledTableCell align="center">Бла бла бла</StyledTableCell>
      <StyledTableCell align="center">Воркаут</StyledTableCell>
      <StyledTableCell align="right">
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button size="small" color="error">
            <PublishIcon />
          </Button>
        </ButtonGroup>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default RequestCardAdmin;
