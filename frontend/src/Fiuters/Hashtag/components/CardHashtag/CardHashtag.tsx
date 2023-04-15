import React from 'react';
import { ButtonGroup, Divider, IconButton, List, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { HashtagListType } from '../../../../types';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../User/usersSlice';

interface Props {
  hashtag: HashtagListType;
}

const CardHashtag: React.FC<Props> = ({ hashtag }) => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <List sx={{ display: 'flex', alignItem: 'center' }}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={hashtag.name} />

        {user && user.role === 'organizer' ? (
          <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
            <IconButton aria-label="delete">
              <RemoveCircleIcon />
            </IconButton>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
          </ButtonGroup>
        ) : null}
      </List>
      <Divider />
    </>
  );
};

export default CardHashtag;
