import { useAppSelector } from "../store/hook";
import { selectUser } from "../store/user/userSlice";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useAppSelector(selectUser);
  if (!user.registered) {
    return <Navigate to="/login" />;
  }
  return children;
}
