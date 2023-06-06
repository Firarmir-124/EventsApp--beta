import React from 'react';
import { Skeleton, TableCell, TableRow } from '@mui/material';

const SkeletonCardReqAdmin = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
      <TableCell>
        <Skeleton variant="rectangular" />
      </TableCell>
    </TableRow>
  );
};

export default SkeletonCardReqAdmin;
