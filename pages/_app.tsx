import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "utils/chakraTheme";
import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "utils/reduxStore";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <UserProvider supabaseClient={supabaseClient}>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </UserProvider>
    </ReduxProvider>
  );
}

export default appWithTranslation(MyApp);
