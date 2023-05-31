import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
interface Props {
  userRole: string | null | undefined;
  priority: string;
}

const Protected: React.FC<Props> = ({ userRole, priority }) => {
  if (
    (userRole === priority && priority === 'organizer') ||
    (priority === 'user' && userRole === 'user') ||
    userRole === 'organizer'
  ) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};
export default Protected;
