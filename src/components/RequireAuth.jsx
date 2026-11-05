import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../auth/authStore";

const RequireAuth = ({ children }) => {
  const user = useCurrentUser();
  return user ? children : <Navigate to="/" replace />;
};

export default RequireAuth;