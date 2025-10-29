import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// PrivateRoute for protecting routes
const PrivateRoute = ({ children, requiredRole }) => {
  const user = useSelector((state) => state.user.user);

  if (!user) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect if the user does not have the required role (admin for example)
    return <Navigate to="/" replace />;
  }

  // Render the children if the user is authenticated and has the correct role
  return children;
};

export default PrivateRoute;
