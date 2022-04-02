import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import {
  ChakraProvider,
  StateProvider,
  UserProvider,
} from "components/Providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <StateProvider>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </StateProvider>
    </UserProvider>
  );
}

export default appWithTranslation(MyApp);
