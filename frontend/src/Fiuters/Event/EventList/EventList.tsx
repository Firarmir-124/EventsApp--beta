import React from 'react';
import {
  Button,
  ButtonGroup,
  Container,
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

const EventList = () => {
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

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Список</StyledTableCell>
              <StyledTableCell align="right">Место</StyledTableCell>
              <StyledTableCell align="right">Время</StyledTableCell>
              <StyledTableCell align="right">Гости</StyledTableCell>
              <StyledTableCell align="right">Спикеры</StyledTableCell>
              <StyledTableCell align="right">Управление</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <StyledTableCell component="th" scope="row">
                1
              </StyledTableCell>
              <StyledTableCell align="right">test</StyledTableCell>
              <StyledTableCell align="right">test</StyledTableCell>
              <StyledTableCell align="right">test</StyledTableCell>
              <StyledTableCell align="right">test</StyledTableCell>
              <StyledTableCell align="right">
                <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
                  <Button>Редактировать</Button>
                  <Button>Удалить</Button>
                </ButtonGroup>
              </StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default EventList;
