import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import Layout from '@/components/organismComplexs/Layout';
import theme from '@/styles/theme';
import '@/styles/styles.css'
import RouterLoading from '@/components/atoms/RouterLoading';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Belajar Menulis</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={theme}
      >
        <RouterLoading />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MantineProvider>
    </>
  );
}