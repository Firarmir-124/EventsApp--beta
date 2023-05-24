import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectFetchRecordsUserLoading, selectListRecordsUser } from '../../Record/recordSlice';
import { fetchRecordsUser } from '../../Record/recordThunk';
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const Requests = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectFetchRecordsUserLoading);
  const listRecordsUser = useAppSelector(selectListRecordsUser);

  useEffect(() => {
    dispatch(fetchRecordsUser());
  }, [dispatch]);

  console.log(listRecordsUser);

  return (
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
                  <IconButton aria-label="delete">
                    <RemoveCircleIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
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
  );
};

export default Requests;
