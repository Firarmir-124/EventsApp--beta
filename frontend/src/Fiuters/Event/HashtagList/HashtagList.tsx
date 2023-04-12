import React from 'react';
import { ButtonGroup, Container, Grid, IconButton, Paper, Typography } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import EditIcon from '@mui/icons-material/Edit';

const HashtagList = () => {
  return (
    <Container sx={{ width: '50%', mt: '50px' }}>
      <Paper sx={{ p: 2 }} elevation={3}>
        <Paper sx={{ mb: 1, p: 1 }} elevation={2}>
          <Grid display="flex" justifyContent="space-between" alignItems="center" container>
            <Grid item>
              <Typography component="p">Название хэштега 3</Typography>
            </Grid>
            <Grid item>
              <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
                <IconButton aria-label="delete">
                  <RemoveCircleIcon />
                </IconButton>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ mb: 1, p: 1 }} elevation={2}>
          <Grid display="flex" justifyContent="space-between" alignItems="center" container>
            <Grid item>
              <Typography component="p">Название хэштега 3</Typography>
            </Grid>
            <Grid item>
              <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
                <IconButton aria-label="delete">
                  <RemoveCircleIcon />
                </IconButton>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ mb: 1, p: 1 }} elevation={2}>
          <Grid display="flex" justifyContent="space-between" alignItems="center" container>
            <Grid item>
              <Typography component="p">Название хэштега 3</Typography>
            </Grid>
            <Grid item>
              <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
                <IconButton aria-label="delete">
                  <RemoveCircleIcon />
                </IconButton>
                <IconButton aria-label="edit">
                  <EditIcon />
                </IconButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Paper>
      </Paper>
    </Container>
  );
};

export default HashtagList;
