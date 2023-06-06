import React from 'react';
import { Grid, Skeleton } from '@mui/material';

const SkeletonCardUser = () => {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Skeleton sx={{ mb: 2 }} variant="rectangular" width="100%" height={300} />
      <Skeleton sx={{ mb: 2 }} variant="rectangular" width="100%" height={50} />
      <Skeleton variant="rectangular" width="100%" height={50} />
    </Grid>
  );
};

export default SkeletonCardUser;
