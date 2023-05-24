import React from 'react';
import { Box, IconButton, TableCell, TableRow } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { RecordUserList } from '../../../types';

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
            background: !record.status ? 'red' : 'green',
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
        <IconButton onClick={removeCardRecord} aria-label="delete">
          <RemoveCircleIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default CardRecordUser;
