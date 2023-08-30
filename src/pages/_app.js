import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import Layout from '@/components/organismComplexs/Layout';
import theme from '@/styles/theme';
import '@/styles/styles.css';
import RouterLoading from '@/components/atoms/RouterLoading';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import ModalLoading from '@/components/molecules/Modal/ModalLoading';
import ModalAlert from '@/components/molecules/Modal/ModalAlert';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isBeforeLogin } from '@/utils/common';
import { UserDataProvider } from '@/context/UserData';

export default function App(props) {
  const { Component, pageProps } = props;
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      if (isBeforeLogin(router.pathname)) {
        window.location.href = '/';
      }
    } else {
      if (!isBeforeLogin(router.pathname)) {
        window.location.href = '/login';
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Belajar Menulis</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <UserDataProvider>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <ModalsProvider
            modals={{
              loading: ModalLoading,
              alert: ModalAlert,
            }}
            modalProps={{
              centered: true,
              closeOnClickOutside: false,
              closeOnEscape: false,
            }}
          >
            <RouterLoading />
            <Notifications />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalsProvider>
        </MantineProvider>
      </UserDataProvider>
    </>
  );
}
