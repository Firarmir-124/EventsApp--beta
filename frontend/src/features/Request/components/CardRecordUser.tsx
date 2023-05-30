import React from 'react';
import { Box, IconButton, TableCell, TableRow, ButtonGroup } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { RecordUserList } from '../../../types';
import LaunchIcon from '@mui/icons-material/Launch';
import { Link } from 'react-router-dom';

interface Props {
  record: RecordUserList;
  removeCardRecord: React.MouseEventHandler;
}

const CardRecordUser: React.FC<Props> = ({ record, removeCardRecord }) => {
  return (
    <TableRow key={record._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        <Box
          sx={{
            background: record.status === 'close' ? 'red' : record.status === 'true' ? 'green' : 'gold',
            width: '25px',
            height: '25px',
            borderRadius: '50%',
          }}
        ></Box>
      </TableCell>
      <TableCell align="center">{record.name.displayName}</TableCell>
      <TableCell align="center">{record.event.title}</TableCell>
      <TableCell align="center">{record.phone}</TableCell>
      <TableCell align="center">
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <IconButton onClick={removeCardRecord} aria-label="delete">
            <RemoveCircleIcon />
          </IconButton>
          <Link to={`/full_event/${record.event._id}`}>
            <IconButton aria-label="delete">
              <LaunchIcon />
            </IconButton>
          </Link>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};

export default CardRecordUser;
