import React from 'react';
import { PositionType } from '../../../types';
import { Paper, Typography } from '@mui/material';

interface Props {
  userPosition: PositionType;
}

const CursorUser: React.FC<Props> = ({ userPosition }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        top: userPosition.y,
        left: userPosition.x,
        position: 'fixed',
        zIndex: 9999,
        background: '#9e61ff',
        width: '15px',
        height: '15px',
        borderRadius: '50%',
      }}
    >
      <Typography component="p" sx={{ position: 'absolute', left: '40px' }}>
        {userPosition.name}
      </Typography>
    </Paper>
  );
};

export default CursorUser;
