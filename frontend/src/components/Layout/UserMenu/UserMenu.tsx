import React from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Logout from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../../../types';
import { logout } from '../../../features/User/usersThunk';
import { useAppDispatch } from '../../../app/hooks';
import { socket } from '../../../socket';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
    socket.emit('ExitUser');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>{user.displayName[0].toUpperCase()}</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link style={{ textDecoration: 'none', color: '#000' }} to="/profile">
          <MenuItem onClick={() => setAnchorEl(null)}>
            <ListItemIcon>
              <Avatar />
            </ListItemIcon>
            Мой профиль
          </MenuItem>
        </Link>
        <Divider sx={{ my: 1 }} />
        {user.role === 'organizer' ? (
          <Link style={{ textDecoration: 'none', color: '#000' }} to="/event">
            <MenuItem onClick={() => setAnchorEl(null)}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Управление мероприятем
            </MenuItem>
          </Link>
        ) : null}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Выйти из аккаунта
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
