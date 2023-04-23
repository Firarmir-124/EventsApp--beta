import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../constants';
import { Button, ButtonGroup, CircularProgress } from '@mui/material';
import { EventList } from '../../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../app/hooks';
import { selectRemoveEventLoading } from '../eventSlice';

interface Props {
  event: EventList;
  removeCardEvent: React.MouseEventHandler;
  openModalEvent: React.MouseEventHandler;
}

const CardEventAdmin: React.FC<Props> = ({ event, removeCardEvent, openModalEvent }) => {
  const removeLoading = useAppSelector(selectRemoveEventLoading);

  return (
    <StyledTableRow key={event._id}>
      <StyledTableCell align="left">{event.title}</StyledTableCell>
      <StyledTableCell align="left">{event.time}</StyledTableCell>
      <StyledTableCell align="left">0</StyledTableCell>
      <StyledTableCell align="left">{event.speaker.length}</StyledTableCell>
      <StyledTableCell align="left">{event.hashtag.name}</StyledTableCell>
      <StyledTableCell align="right">
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button disabled={removeLoading} onClick={removeCardEvent} size="small" color="error">
            {!removeLoading ? <DeleteIcon /> : <CircularProgress size={20} />}
          </Button>
          <Button onClick={openModalEvent} size="small" color="success">
            <EditIcon />
          </Button>
        </ButtonGroup>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CardEventAdmin;
