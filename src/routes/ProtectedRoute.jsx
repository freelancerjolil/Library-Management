import { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (
      user &&
      requiredRole &&
      Array.isArray(user.roles) &&
      !user.roles.includes(requiredRole)
    ) {
      setIsAuthorized(false);
    }
  }, [user, requiredRole]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner
  }

  if (!user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
