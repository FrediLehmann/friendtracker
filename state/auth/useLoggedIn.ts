import { useSelector } from "@xstate/react";
import { GlobalStateContext } from "components/Providers/StateProvider";
import { useContext } from "react";
import { loggedInSelector } from "./selectors";

export default function useLoggedIn() {
  const { authService } = useContext(GlobalStateContext)
  return useSelector(authService, loggedInSelector)
}