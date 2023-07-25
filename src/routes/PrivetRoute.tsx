import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/hooks";
import Loading from "../components/loading";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { user, loading } = useAppSelector((state) => state);

  if (loading.loading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }

  if (!user.loggedIn && !loading.loading) {
    return <Navigate to="/login" />;
  }

  return children;
}
