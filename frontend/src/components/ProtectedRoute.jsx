import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";


const ProtectedRoute = ({ children, role }) => {
  const { user } = useUser();


  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // logged in, but wrong role: redirect them to their actual dashboard
  if (role && user.role !== role) {
    const redirectPath = getRedirectPath(user.role);
    return <Navigate to={redirectPath} replace />;
    
    }

  return children;
};

export default ProtectedRoute;
