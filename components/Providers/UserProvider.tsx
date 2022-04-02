import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";

export default function Provider({ children }: { children: JSX.Element }) {
  return (
    <UserProvider supabaseClient={supabaseClient}>{children}</UserProvider>
  );
}
