import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../constants';
import { Box, Tooltip, Typography } from '@mui/material';
import { EventList } from '../../../types';
import Divider from '@mui/material/Divider';
import dayjs from 'dayjs';
import ru from 'dayjs/locale/ru';

interface Props {
  event: EventList;
}

const CardEventLink: React.FC<Props> = ({ event }) => {
  return (
    <StyledTableRow key={event._id}>
      <StyledTableCell align="left">{event.title}</StyledTableCell>
      <StyledTableCell align="left">{dayjs(event.time).locale(ru).format('dddd, MMMM D, YYYY h:mm A')}</StyledTableCell>
      <StyledTableCell align="left">
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
          <Box sx={{ cursor: 'pointer' }}> {event.guest.length}</Box>
        </Tooltip>
      </StyledTableCell>

      <StyledTableCell align="left">
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
          <Box sx={{ cursor: 'pointer' }}>{event.speaker.length}</Box>
        </Tooltip>
      </StyledTableCell>
      <StyledTableCell align="left">{event.hashtag.name}</StyledTableCell>
    </StyledTableRow>
  );
};

export default CardEventLink;
