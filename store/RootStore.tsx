import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoginStatusLoading, setMainEmail, setUserLoggedIn } from "./user";

export default function RootStore({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();

  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading) {
      dispatch(setUserLoggedIn(!!user));
      dispatch(setMainEmail(user?.email || ""));
    }
  }, [dispatch, isLoading, user]);

  useEffect(() => {
    dispatch(setLoginStatusLoading(isLoading));
  }, [dispatch, isLoading]);

  return <>{children}</>;
}
