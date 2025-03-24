import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../../redux/feature/auth/authSlice";

// Protected Route Component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useCurrentToken();
  // console.log(token);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
