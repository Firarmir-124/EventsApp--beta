import React from 'react';
import { Divider, List, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { HashtagListType } from '../../../../types';

interface Props {
  hashtag: HashtagListType;
}

const CardHashtagUser: React.FC<Props> = ({ hashtag }) => {
  return (
    <>
      <List sx={{ display: 'flex', alignItem: 'center' }}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={hashtag.name} />
      </List>
      <Divider />
    </>
  );
};

export default CardHashtagUser;
