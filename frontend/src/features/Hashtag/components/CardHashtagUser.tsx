import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { HashtagListType } from '../../../types';
import TagIcon from '@mui/icons-material/Tag';
import { Link } from 'react-router-dom';

interface Props {
  hashtag: HashtagListType;
}

const CardHashtagUser: React.FC<Props> = ({ hashtag }) => {
  return (
    <ListItemButton component={Link} to={'/' + hashtag._id}>
      <ListItemIcon>
        <TagIcon />
      </ListItemIcon>
      <ListItemText primary={hashtag.name} />
    </ListItemButton>
  );
};

export default CardHashtagUser;
