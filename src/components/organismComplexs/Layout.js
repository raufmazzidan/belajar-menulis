import React from 'react';
import Navigation from '../organisms/Navigation';
import { AppShell, Box } from '@mantine/core';
import { HeaderMegaMenu } from '../organisms/Header';
import { useDisclosure } from '@mantine/hooks';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  const router = useRouter();

  if (['/404'].includes(router.pathname)) {
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
