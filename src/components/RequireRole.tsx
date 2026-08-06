import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { UserRole } from "../types/auth";

interface RequireRoleProps {
  roles: UserRole[];
}

const RequireRole = ({ roles }: RequireRoleProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  if (!user) {
    return (
      <Navigate to="/signin" state={{ from: location.pathname }} replace />
    );
  }

  if (!roles.includes(user.role)) {
    return <Navigate to="/explore" replace />;
  }

  return <Outlet />;
};

export default RequireRole;
