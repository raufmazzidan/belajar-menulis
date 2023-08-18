import React from 'react';
import Navigation from '../organisms/Navigation';
import { AppShell } from '@mantine/core';
import { HeaderMegaMenu } from '../organisms/Header';
import { useDisclosure } from '@mantine/hooks';

const Layout = ({ children }) => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);

  return (
    <>
      <AppShell
        padding="md"
        navbar={<Navigation drawer={{ drawerOpened, closeDrawer }} />}
        header={<HeaderMegaMenu drawer={{ drawerOpened, toggleDrawer }} />}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >
        {/* Your application here */}
        {children}
      </AppShell>

    </>
  );
}

export default Layout;