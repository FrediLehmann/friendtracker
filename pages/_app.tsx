import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ChakraProvider, UserProvider } from "utils/Providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserProvider>
  );
}

export default appWithTranslation(MyApp);
