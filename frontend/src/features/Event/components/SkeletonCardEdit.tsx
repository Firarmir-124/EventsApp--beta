import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const SkeletonCardEdit = () => {
  return (
    <Grid width={500} container spacing={2}>
      <Grid xs={12} item>
        <Skeleton variant="rectangular" height={100} />
      </Grid>
      <Grid xs={12} item>
        <Skeleton variant="rectangular" height={100} />
      </Grid>
      <Grid xs={12} item>
        <Skeleton variant="rectangular" height={100} />
      </Grid>
      <Grid xs={12} item>
        <Skeleton variant="rectangular" height={100} />
      </Grid>
    </Grid>
  );
};

export default SkeletonCardEdit;
