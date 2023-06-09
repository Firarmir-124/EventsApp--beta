import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  Alert,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectFetchEventLinkLoading, selectListEventLink } from './commercialLinkSlice';
import { fetchEventLink } from './CommercialLinkThunk';
import { useParams } from 'react-router-dom';
import { StyledTableCell } from '../../constants';
import SkeletonCardAdmin from '../Event/components/SkeletonCardAdmin';
import CardEventLink from './components/CardEventLink';
import ReactMarkdown from 'react-markdown';

const CommercialLink = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const listLocationLink = useAppSelector(selectListEventLink);
  const loading = useAppSelector(selectFetchEventLinkLoading);

  useEffect(() => {
    if (id) {
      dispatch(fetchEventLink(id));
    }
  }, [dispatch, id]);

  return (
    <Container>
      <Paper sx={{ p: 1 }}>
        <Typography sx={{ my: 2, mr: 1 }} component="h1" variant="h4">
          Информация
        </Typography>

        <ReactMarkdown>{listLocationLink.description}</ReactMarkdown>
      </Paper>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={{ my: 2, mr: 1 }} component="h1" variant="h4">
          Отчёт от {listLocationLink.user.displayName}
          <Divider light sx={{ mt: 1, background: '#ff6300' }} />
        </Typography>
      </Box>
      <Paper elevation={3} sx={{ width: '100%', minHeight: '600px', overflowX: 'hidden' }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Название</StyledTableCell>
                <StyledTableCell align="left">Время</StyledTableCell>
                <StyledTableCell align="left">Гости</StyledTableCell>
                <StyledTableCell align="left">Спикеры</StyledTableCell>
                <StyledTableCell align="left">Хэштег</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listLocationLink.event.length !== 0 ? (
                listLocationLink.event.map((event) =>
                  !loading ? <CardEventLink key={event._id} event={event} /> : <SkeletonCardAdmin key={event._id} />,
                )
              ) : (
                <TableRow>
                  <TableCell>
                    <Alert severity="info">Список в данный момент пуст</Alert>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default CommercialLink;
