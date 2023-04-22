import React, { useEffect } from 'react';
import { Alert, CircularProgress, Grid, List, ListSubheader, Paper } from '@mui/material';
import CardHashtagUser from '../components/CardHashtagUser';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectHashtagList, selectHashtagListLoading } from '../hashtagSlice';
import { fetchHashtagList } from '../hashtagThunk';

const HashtagListUser = () => {
  const dispatch = useAppDispatch();
  const loadingHashtagList = useAppSelector(selectHashtagListLoading);
  const hashtagList = useAppSelector(selectHashtagList);

  useEffect(() => {
    dispatch(fetchHashtagList());
  }, [dispatch]);

  return (
    <Grid marginLeft={5} xs={3} item>
      <Paper>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Список хэштегов
            </ListSubheader>
          }
        >
          {!loadingHashtagList ? (
            hashtagList.length !== 0 ? (
              hashtagList.map((hashtag) => <CardHashtagUser key={hashtag._id} hashtag={hashtag} />)
            ) : (
              <Alert severity="info">Списка нет</Alert>
            )
          ) : (
            <CircularProgress />
          )}
        </List>
      </Paper>
    </Grid>
  );
};

export default HashtagListUser;
