import { useUser } from "@supabase/supabase-auth-helpers/react";
import { useEffect, useState } from "react";

export default function useIsLoggedIn(): boolean {
  const { isLoading, user } = useUser()

  const [loggedIn, setLoggedIn] = useState<boolean>(!user)

  useEffect(() => {
    !isLoading && setLoggedIn(!!user)
  }, [isLoading, user])

  return loggedIn
}