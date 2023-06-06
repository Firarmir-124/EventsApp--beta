import React from 'react';
import { Avatar, Button, Tooltip, Box, styled, TooltipProps, tooltipClasses } from '@mui/material';
import { blue } from '@mui/material/colors';
import { StyledBadge } from '../../../constants';
import { OnlineType } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import { selectInviteStatus } from '../eventSlice';
import { selectUser } from '../../User/usersSlice';

interface Props {
  online: OnlineType;
  addOnline?: React.MouseEventHandler;
}

const UserOnline: React.FC<Props> = ({ online, addOnline }) => {
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: 'rgba(0, 0, 0, 0.87)',
      boxShadow: theme.shadows[10],
      fontSize: 11,
    },
  }));

  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectInviteStatus);

  return (
    <LightTooltip
      title={
        <Box sx={{ p: 1 }}>
          <Button
            size="small"
            sx={{ color: '#fff' }}
            disabled={status || online.status}
            variant="contained"
            onClick={addOnline}
          >
            Пригласить
          </Button>
        </Box>
      }
    >
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
        sx={{ mr: 2 }}
      >
        <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="/broken-image.jpg">
          {user && user._id === online.userId ? 'Я' : online.name[0]}
        </Avatar>
      </StyledBadge>
    </LightTooltip>
  );
};

UserOnline.displayName = 'UserOnline';

export default UserOnline;
