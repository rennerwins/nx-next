import { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import * as React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ThemeProvider } from 'next-themes';

function CustomApp({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
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
