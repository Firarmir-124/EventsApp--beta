import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFetchRecordsUserLoading, selectListRecordsUser } from '../recordSlice';
import { fetchRecordsUser, removeRecordUser } from '../recordThunk';
import { Alert, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { openSnackbar } from '../../Event/eventSlice';
import CardRecordUser from '../components/CardRecordUser';
import SnackbarCard from '../../../components/SnackbarCard';
import useConfirm from '../../../components/Dialogs/Confirm/useConfirm';

const RecordListUser = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectFetchRecordsUserLoading);
  const listRecordsUser = useAppSelector(selectListRecordsUser);
  const { confirm } = useConfirm();

  useEffect(() => {
    dispatch(fetchRecordsUser());
  }, [dispatch]);

  const removeCardRecord = async (id: string) => {
    if (await confirm('Уведомление', 'Вы действительно хотите удалить ?')) {
      await dispatch(removeRecordUser(id)).unwrap();
      await dispatch(fetchRecordsUser()).unwrap();
      dispatch(openSnackbar({ status: true, parameter: 'remove_card_user' }));
    } else {
      return;
    }
  };

  return (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Статус</TableCell>
            <TableCell align="center">Отправитель</TableCell>
            <TableCell align="center">Евент</TableCell>
            <TableCell align="center">Номер телефона</TableCell>
            <TableCell align="center">Управление</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? (
            listRecordsUser.length !== 0 ? (
              listRecordsUser.map((record) => (
                <CardRecordUser
                  key={record._id}
                  record={record}
                  removeCardRecord={() => removeCardRecord(record._id)}
                />
              ))
            ) : (
              <TableRow>
                <TableCell>
                  <Alert severity="info">Список пуст</Alert>
                </TableCell>
              </TableRow>
            )
          ) : (
            <TableRow>
              <TableCell>
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <SnackbarCard />
    </>
  );
};

export default RecordListUser;
