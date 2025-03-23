import { ReactNode } from "react";
import { useAppSelector } from "../../redux/redux.hooks";
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../../redux/feature/auth/authSlice";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  console.log(token);

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
