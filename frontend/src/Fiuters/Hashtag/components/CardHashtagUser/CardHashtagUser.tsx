import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { HashtagListType } from '../../../../types';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  hashtag: HashtagListType;
}

const CardHashtagUser: React.FC<Props> = ({ hashtag }) => {
  return (
    <ListItemButton>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary={hashtag.name} />
    </ListItemButton>
  );
};

export default CardHashtagUser;
