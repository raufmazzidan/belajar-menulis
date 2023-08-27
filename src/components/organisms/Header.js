import { Header, Group, UnstyledButton, Text, Burger, rem, Menu, Avatar } from '@mantine/core';
import { IconChevronDown, IconUser } from '@tabler/icons-react';
import useWindowSize from '@/utils/hooks/useWindowSize';
import Logo from '../atoms/Logo';

export function HeaderMegaMenu(props) {
  const {
    drawer: { drawerOpened, toggleDrawer },
  } = props;
  const isMobile = useWindowSize({ type: 'max', limit: 'sm' });

  return (
    <>
      <Header height={80} px={isMobile ? 32 : 80}>
        <Group position={'apart'} sx={{ height: '100%' }}>
          <Group>
            <Burger opened={drawerOpened} onClick={toggleDrawer} hidden={!isMobile} bga="dark.4" />
            <Logo />
          </Group>
          <Group align="right">
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                <UnstyledButton>
                  <Group spacing={7}>
                    <Avatar radius="xl" size={40} />
                    {!isMobile && (
                      <>
                        <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                          Rauf Mazzidan
                        </Text>
                        <IconChevronDown size={rem(12)} stroke={1.5} />
                      </>
                    )}
                  </Group>
                </UnstyledButton>
              </Menu.Target>

              <Menu.Dropdown>
                {isMobile && <Menu.Label>Rauf Mazzidan</Menu.Label>}
                <Menu.Item icon={<IconUser size={14} />}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </Header>
    </>
  );
}
