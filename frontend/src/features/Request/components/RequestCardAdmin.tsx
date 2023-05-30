import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../constants';
import { Button, ButtonGroup, CircularProgress } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { RecordUserList } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { openModal } from '../../Event/eventSlice';
import { selectPublishedLoading } from '../recordSlice';

interface Props {
  list: RecordUserList;
  setIndex: () => void;
  publishedRecord: React.MouseEventHandler;
}

const RequestCardAdmin: React.FC<Props> = ({ list, setIndex, publishedRecord }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPublishedLoading);

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
          <ButtonGroup
            onClick={publishedRecord}
            disabled={loading}
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button size="small" color="error">
              {!loading ? <PublishIcon /> : <CircularProgress />}
            </Button>
          </ButtonGroup>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default RequestCardAdmin;
