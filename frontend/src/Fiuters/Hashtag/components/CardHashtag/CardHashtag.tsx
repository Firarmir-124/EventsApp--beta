import React from 'react';
import { ButtonGroup, CircularProgress, Divider, IconButton, List, ListItemIcon, ListItemText } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import { HashtagListType } from '../../../../types';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from '../../../../app/hooks';
import { selectUser } from '../../../User/usersSlice';
import { selectRemoveLoading } from '../../../Event/eventSlice';

interface Props {
  hashtag: HashtagListType;
  removeHashtagCard: React.MouseEventHandler;
  setOpenModal: React.MouseEventHandler;
}

const CardHashtag: React.FC<Props> = ({ hashtag, removeHashtagCard, setOpenModal }) => {
  const user = useAppSelector(selectUser);
  const removeLoading = useAppSelector(selectRemoveLoading);
  return (
    <>
      <List sx={{ display: 'flex', alignItem: 'center' }}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={hashtag.name} />

        {user && user.role === 'organizer' ? (
          <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
            <IconButton disabled={removeLoading} onClick={removeHashtagCard} aria-label="delete">
              {!removeLoading ? <RemoveCircleIcon /> : <CircularProgress />}
            </IconButton>
            <IconButton onClick={setOpenModal} aria-label="edit">
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
