import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEventList, selectEventLoading } from '../eventSlice';
import { fetchEventList } from '../eventThunk';
import { StyledTableCell, StyledTableRow } from '../../../constants';

const EventList = () => {
  const [page, setPage] = React.useState(1);
  const dispatch = useAppDispatch();
  const eventList = useAppSelector(selectEventList);
  const loadingEventList = useAppSelector(selectEventLoading);

  useEffect(() => {
    if (page) {
      dispatch(fetchEventList(page));
    }
  }, [dispatch, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Навание</StyledTableCell>
              <StyledTableCell align="left">Время</StyledTableCell>
              <StyledTableCell align="left">Гости</StyledTableCell>
              <StyledTableCell align="left">Спикеры</StyledTableCell>
              <StyledTableCell align="right">Управление</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loadingEventList ? (
              eventList.eventPlanList.length !== 0 ? (
                eventList.eventPlanList.map((event) => (
                  <StyledTableRow key={event._id}>
                    <StyledTableCell align="left">{event.title}</StyledTableCell>
                    <StyledTableCell align="left">{event.time}</StyledTableCell>
                    <StyledTableCell align="left">0</StyledTableCell>
                    <StyledTableCell align="left">{event.speaker.length}</StyledTableCell>
                    <StyledTableCell align="right">
                      <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
                        <Button>Редактировать</Button>
                        <Button>Удалить</Button>
                      </ButtonGroup>
                    </StyledTableCell>
                  </StyledTableRow>
                ))
              ) : (
                <Alert severity="info">Нет мероприятий !</Alert>
              )
            ) : (
              <CircularProgress />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={Math.ceil(eventList.eventPlanListLength / 5)} page={page} onChange={handleChange} />
    </Container>
  );
};

export default EventList;
