import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { fetchCurrentUser } from "../features/authentication/authSlice";

type Props = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const RequireRole = ({ allowedRoles, children }: Props) => {
  const dispatch = useDispatch<any>();
  const { username, roles, loading, initialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // On hard refresh, Redux state is empty; re-hydrate from the backend cookie.
    if (!initialized && !loading) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, initialized, loading]);

  // Avoid redirecting before we know whether the user has a valid session cookie.
  if (!initialized || loading) {
    return null;
  }

  if (!username) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.some(role => roles?.includes(role))) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default RequireRole;
