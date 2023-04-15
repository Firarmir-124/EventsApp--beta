import React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

const CardHashtag = () => {
  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Хештег 1" />
      </ListItemButton>
      <Divider />
    </>
  );
};

export default CardHashtag;
