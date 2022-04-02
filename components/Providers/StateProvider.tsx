import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { useInterpret } from "@xstate/react";
import { authMachine } from "state/auth/machine";
import { createContext, useEffect } from "react";
import { InterpreterFrom } from "xstate";
import { useUser } from "@supabase/supabase-auth-helpers/react";

export const GlobalStateContext = createContext({
  authService: {} as InterpreterFrom<typeof authMachine>,
});

export default function Provider({ children }: { children: JSX.Element }) {
  const authService = useInterpret(authMachine);
  const { user } = useUser();

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event) => {
        event === "SIGNED_IN"
          ? authService.send("LOGIN")
          : authService.send("LOGOUT");
      }
    );

    return () => authListener?.unsubscribe();
  }, [authService]);

  useEffect(() => {
    if (user && !authService.state.matches("authenticated")) {
      authService.send("LOGIN");
    } else if (!user && authService.state.matches("authenticated")) {
      authService.send("LOGOUT");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalStateContext.Provider value={{ authService }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
