import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../constants';
import { Button, ButtonGroup, CircularProgress } from '@mui/material';
import { EventList } from '../../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../app/hooks';
import { selectCellTable, selectRemoveEventLoading } from '../eventSlice';

interface Props {
  event: EventList;
  removeCardEvent: React.MouseEventHandler;
  openModalEvent: React.MouseEventHandler;
}

const CardEventAdmin: React.FC<Props> = ({ event, removeCardEvent, openModalEvent }) => {
  const removeLoading = useAppSelector(selectRemoveEventLoading);
  const cellTables = useAppSelector(selectCellTable);

  return (
    <StyledTableRow key={event._id}>
      {cellTables
        .filter((item) => item.show)
        .map((name) => {
          if (name.fullName)
            return (
              <StyledTableCell key={name.id} align="left">
                {name.fullName === 'time' && event.time}
                {name.fullName === 'title' && event.title}
                {name.fullName === 'null' && '0'}
                {name.fullName === 'speaker' && event.speaker.length}
                {name.fullName === 'hashtag' && event.hashtag.name}
              </StyledTableCell>
            );
        })}

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
