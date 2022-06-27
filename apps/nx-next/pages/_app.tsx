import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import * as React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'next-themes';
import Script, { ScriptProps } from 'next/script';

interface CustomProps extends ScriptProps {
  cmpUser: string;
}
const CustomScript = (props: CustomProps) => {
  return (
    <Script
      async
      type="text/javascript"
      src="https://sdkbanner.g-consent.com/banner-core.js"
      cmpUser="0d576eb6d897075b4adbd99b90ff41086c627945afaacf4b98e04e6139056458cc1c52e03f0ff2e2567461b1b3b01add"
      lang="EN"
    />
  );
};

function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Script
          async
          type="text/javascript"
          src="https://sdkbanner.g-consent.com/banner-core.js"
          cmpUser="0d576eb6d897075b4adbd99b90ff41086c627945afaacf4b98e04e6139056458cc1c52e03f0ff2e2567461b1b3b01add"
          lang="EN"
        />
        <Head>
          <title>Welcome to nx-next!</title>
        </Head>
        <main className="app">
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </main>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default CustomApp;
