import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../constants';
import { Button, ButtonGroup } from '@mui/material';
import { EventList } from '../../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  event: EventList;
}

const CardEventAdmin: React.FC<Props> = ({ event }) => {
  return (
    <StyledTableRow key={event._id}>
      <StyledTableCell align="left">{event.title}</StyledTableCell>
      <StyledTableCell align="left">{event.time}</StyledTableCell>
      <StyledTableCell align="left">0</StyledTableCell>
      <StyledTableCell align="left">{event.speaker.length}</StyledTableCell>
      <StyledTableCell align="right">
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button size="small" color="error">
            <DeleteIcon />
          </Button>
          <Button size="small" color="success">
            <EditIcon />
          </Button>
        </ButtonGroup>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CardEventAdmin;
