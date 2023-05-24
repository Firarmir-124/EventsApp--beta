import React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { openSnackbar, selectSnackbarState } from '../features/Event/eventSlice';

const SnackbarCard = () => {
  const open = useAppSelector(selectSnackbarState);
  const dispatch = useAppDispatch();
  let txt = '';

  switch (open.parameter) {
    case 'create_event':
      txt += 'Мероприятие успешно создано';
      break;
    case 'remove_event':
      txt += 'Мероприятие успешно удалено';
      break;
    case 'create_hashtag':
      txt += 'Хэштег успешно создан';
      break;
    case 'remove_hashtag':
      txt += 'Хэштег успешно удалено';
      break;
    case 'add_favorites':
      txt += 'Евент успешно добавлен в избранное';
      break;
    case 'remove_favorites':
      txt += 'Евент успешно убрался из избранного';
      break;
    case 'create_record_user':
      txt += 'Запрос успешно добавлен';
      break;
  }

  return (
    <Snackbar
      open={open.status}
      autoHideDuration={6000}
      onClose={() => dispatch(openSnackbar({ status: false, parameter: '' }))}
    >
      <Alert
        onClose={() => dispatch(openSnackbar({ status: false, parameter: '' }))}
        severity="success"
        sx={{ width: '100%' }}
      >
        {txt}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarCard;
