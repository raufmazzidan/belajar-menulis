import React from 'react';
import Navigation from '../organisms/Navigation';
import { AppShell, Box } from '@mantine/core';
import { HeaderMegaMenu } from '../organisms/Header';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { isBeforeLogin } from '@/utils/common';

const Layout = ({ children }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const router = useRouter();

  if (isBeforeLogin(router.pathname) || router.pathname === '/404') {
    return children;
  }

  return (
    <>
      <AppShell
        padding="md"
        navbar={<Navigation drawer={{ drawerOpened, closeDrawer }} />}
        header={<HeaderMegaMenu drawer={{ drawerOpened, toggleDrawer }} />}
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        <Box p={16}>{children}</Box>
      </AppShell>
    </>
  );
};

export default Layout;
