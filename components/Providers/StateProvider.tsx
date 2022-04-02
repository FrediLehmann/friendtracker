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
    if (user && !authService.state.matches("authenticated")) {
      authService.send("LOGIN");
    } else if (!user && authService.state.matches("authenticated")) {
      authService.send("LOGOUT");
    }
  }, [user, authService]);

  return (
    <GlobalStateContext.Provider value={{ authService }}>
      {children}
    </GlobalStateContext.Provider>
  );
}
