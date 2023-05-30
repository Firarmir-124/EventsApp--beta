import React, { useState } from 'react';
import { Alert, Box, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAlertsUser, selectFetchAlertsUserLoading } from '../../User/usersSlice';
import { patchViewed } from '../../User/usersThunk';
import ModalCard from '../../../components/ModalCard';
import { openModal } from '../../Event/eventSlice';
import { noPassedStage, passedStage } from '../../../constants';

const AlertUser = () => {
  const dispatch = useAppDispatch();
  const alertUser = useAppSelector(selectAlertsUser);
  const loading = useAppSelector(selectFetchAlertsUserLoading);
  const [index, setIndex] = useState('');

  const openAlertUser = async (id: string) => {
    await dispatch(patchViewed(id)).unwrap();
    setIndex(id);
    dispatch(openModal());
  };

  const description = alertUser ? alertUser.alert.find((item) => item._id === index) : null;

  return alertUser ? (
    <>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Статус</TableCell>
            <TableCell align="right">Евент</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!loading ? (
            alertUser.alert.length !== 0 ? (
              alertUser.alert
                .filter((item) => !item.viewed)
                .map((alertUser) => (
                  <TableRow
                    key={alertUser._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    onClick={() => openAlertUser(alertUser._id)}
                  >
                    <TableCell align="left">
                      <Box
                        sx={{
                          background: alertUser.status ? 'green' : 'red',
                          width: '25px',
                          height: '25px',
                          borderRadius: '50%',
                        }}
                      ></Box>
                    </TableCell>
                    <TableCell align="right">{alertUser.eventId.title}</TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell>
                  <Alert severity="info">Оповещений нет</Alert>
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
      <ModalCard>{description ? (description.status ? passedStage : noPassedStage) : null}</ModalCard>
    </>
  ) : (
    <Alert></Alert>
  );
};

export default AlertUser;
