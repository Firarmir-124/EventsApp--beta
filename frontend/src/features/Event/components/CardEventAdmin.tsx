import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../constants';
import { Box, Button, ButtonGroup, CircularProgress, Paper, Switch, Tooltip, Typography } from '@mui/material';
import { EventList } from '../../../types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../app/hooks';
import { selectCellTable, selectCheckedEventLoading, selectRemoveEventLoading } from '../eventSlice';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';

interface Props {
  event: EventList;
  removeCardEvent: React.MouseEventHandler;
  openModalEvent: React.MouseEventHandler;
  checkedCardEvent: React.MouseEventHandler;
  open: boolean;
}

const CardEventAdmin: React.FC<Props> = ({ event, removeCardEvent, openModalEvent, checkedCardEvent, open }) => {
  const removeLoading = useAppSelector(selectRemoveEventLoading);
  const cellTablesGlobal = useAppSelector(selectCellTable);
  const loadingPatch = useAppSelector(selectCheckedEventLoading);

  return (
    <StyledTableRow key={event._id}>
      {cellTablesGlobal
        .filter((item) => item.show)
        .map((name) => {
          if (name.fullName)
            return (
              <StyledTableCell key={name.id} align="left">
                {name.fullName === 'time' && <> {dayjs(event.time).locale(ru).format('dddd, MMMM D, YYYY h:mm A')}</>}
                {name.fullName === 'title' && event.title}
                <Tooltip
                  title={
                    event.guest.length !== 0 ? (
                      event.guest.map((guestItem) => (
                        <>
                          <Typography color="inherit">{guestItem.name.displayName}</Typography>
                          <Divider />
                        </>
                      ))
                    ) : (
                      <Typography color="inherit">Гостей нет !</Typography>
                    )
                  }
                >
                  <Box sx={{ cursor: 'pointer' }}> {name.fullName === 'guest' && event.guest.length}</Box>
                </Tooltip>
                <Tooltip
                  title={
                    event.speaker.length > 0 ? (
                      event.speaker.map((speckItem) => (
                        <>
                          <Typography color="inherit">{speckItem.name}</Typography>
                          <Divider />
                        </>
                      ))
                    ) : (
                      <Typography color="inherit">Гостей нет !</Typography>
                    )
                  }
                >
                  <Box sx={{ cursor: 'pointer' }}>{name.fullName === 'speaker' && event.speaker.length}</Box>
                </Tooltip>

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
          {open && (
            <Paper sx={{ ml: 1 }} elevation={3}>
              <Switch
                disabled={loadingPatch ? loadingPatch === event._id : false}
                onClick={checkedCardEvent}
                checked={event.checked}
              />
            </Paper>
          )}
        </ButtonGroup>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default CardEventAdmin;
