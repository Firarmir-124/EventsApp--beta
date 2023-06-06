import React from 'react';
import { StyledTableCell, StyledTableRow } from '../../../constants';
import { Button, ButtonGroup, CircularProgress } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import { RecordUserList } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { openModal } from '../../Event/eventSlice';
import { selectPublishedLoading, selectRemoveRecordUserLoading } from '../recordSlice';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';

interface Props {
  list: RecordUserList;
  setIndex: () => void;
  publishedRecord: React.MouseEventHandler;
  noPublishedRecord: React.MouseEventHandler;
}

const RequestCardAdmin: React.FC<Props> = ({ list, setIndex, publishedRecord, noPublishedRecord }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectPublishedLoading);
  const loadingRemove = useAppSelector(selectRemoveRecordUserLoading);

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
          <ButtonGroup disabled={loading} variant="contained" aria-label="outlined primary button group">
            <Button disabled={loading} onClick={publishedRecord} size="small" color="error">
              {!loading ? <PublishIcon /> : <CircularProgress />}
            </Button>
            <Button disabled={loadingRemove} onClick={noPublishedRecord} size="small" color="error">
              {!loadingRemove ? <DoNotDisturbIcon /> : <CircularProgress />}
            </Button>
          </ButtonGroup>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default RequestCardAdmin;
