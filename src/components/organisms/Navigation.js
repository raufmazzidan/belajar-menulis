import { Box, Divider, Drawer, Navbar, ScrollArea } from '@mantine/core';
import React, { useEffect } from 'react';
import Logo from '../atoms/Logo';
import { IconLayoutDashboard, IconAlphabetGreek, IconUsersGroup, IconChartPie2 } from '@tabler/icons-react';
import useWindowSize from '@/utils/hooks/useWindowSize';
import NavbarItem from '../molecules/NavbarItem';
import { useRouter } from 'next/router';

const mockdata = [
  { label: 'Dashboard', icon: IconLayoutDashboard, link: '/' },
  { label: 'Question Management', icon: IconAlphabetGreek, link: '/question' },
  { label: 'Mentee Management', icon: IconUsersGroup, link: '/mentee' },
  { label: 'Mentee Result', icon: IconChartPie2, link: '/report' },
  // {
  //   label: 'Market news',
  //   icon: IconChartPie2,
  //   initiallyOpened: true,
  //   childs: [
  //     { label: 'Overview', link: '/a' },
  //     { label: 'Forecasts', link: '/b' },
  //     { label: 'Outlook', link: '/c' },
  //     { label: 'Real time', link: '/d' },
  //   ],
  // },
];

const Navigation = (props) => {
  const router = useRouter();
  const {
    drawer: { drawerOpened, closeDrawer },
  } = props;
  const isMobile = useWindowSize({ type: 'max', limit: 'sm' });

  useEffect(() => {
    closeDrawer();
  }, [router.asPath, closeDrawer]);

  if (isMobile) {
    return (
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        closeButtonProps={{ size: 'md' }}
        size="300px"
        padding="md"
        title={
          <Box h={47}>
            <Logo />
          </Box>
        }
        overlayProps={{ opacity: 0.5, blur: 4 }}
        zIndex={1000000}
      >
        <Divider color="gray.2" />
        <Box pt={16}>
          {mockdata.map((item) => (
            <NavbarItem {...item} key={item.label} />
          ))}
        </Box>
      </Drawer>
    );
  }

  return (
    <Navbar height="100vh" width={{ xs: 300 }} p="md">
      <Navbar.Section grow component={ScrollArea}>
        <div>
          {mockdata.map((item) => (
            <NavbarItem {...item} key={item.label} />
          ))}
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default Navigation;
