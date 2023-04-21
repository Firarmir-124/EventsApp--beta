import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Pagination,
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectEventList, selectEventLoading } from '../eventSlice';
import { fetchEventList } from '../ecentThunk';

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

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Список</StyledTableCell>
              <StyledTableCell align="right">Навание</StyledTableCell>
              <StyledTableCell align="right">Время</StyledTableCell>
              <StyledTableCell align="right">Гости</StyledTableCell>
              <StyledTableCell align="right">Спикеры</StyledTableCell>
              <StyledTableCell align="right">Управление</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loadingEventList ? (
              eventList.eventPlanList.length !== 0 ? (
                eventList.eventPlanList.map((event, index) => (
                  <StyledTableRow key={event._id}>
                    <StyledTableCell component="th" scope="row">
                      {index}
                    </StyledTableCell>
                    <StyledTableCell align="right">{event.title}</StyledTableCell>
                    <StyledTableCell align="right">{event.time}</StyledTableCell>
                    <StyledTableCell align="right">0</StyledTableCell>
                    <StyledTableCell align="right">{event.speaker.length}</StyledTableCell>
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
      <Pagination count={Math.ceil(eventList.eventPlanListLength / 15)} page={page} onChange={handleChange} />
    </Container>
  );
};

export default EventList;
