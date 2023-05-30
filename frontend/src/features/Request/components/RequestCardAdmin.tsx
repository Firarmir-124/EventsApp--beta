import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../constants';
import { Button, ButtonGroup } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { RecordUserList } from '../../../types';
import { useAppDispatch } from '../../../app/hooks';
import { openModal } from '../../Event/eventSlice';

interface Props {
  list: RecordUserList;
  setIndex: () => void;
}

const RequestCardAdmin: React.FC<Props> = ({ list, setIndex }) => {
  const dispatch = useAppDispatch();

  const openDescriptionModal = () => {
    dispatch(openModal());
    setIndex();
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell align="center">{list.name.displayName}</StyledTableCell>
        <StyledTableCell align="center">{list.phone}</StyledTableCell>
        <StyledTableCell align="center">
          <Button onClick={openDescriptionModal} variant="text">
            Информация
          </Button>
        </StyledTableCell>
        <StyledTableCell align="center">{list.event.title}</StyledTableCell>
        <StyledTableCell align="right">
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            <Button size="small" color="error">
              <PublishIcon />
            </Button>
          </ButtonGroup>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default RequestCardAdmin;
