import { useState } from 'react';
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';

const NavbarItem = ({ icon: Icon, label, initiallyOpened, link, childs }) => {
  const hasChild = Array.isArray(childs);
  const [opened, setOpened] = useState(initiallyOpened || false);

  const items = (hasChild ? childs : []).map((child) => (
    <Text
      component={Link}
      href={child.link}
      py="sm"
      fw={500}
      fz="sm"
      sx={(theme) => ({
        display: 'block',
        textDecoration: 'none',
        paddingLeft: 32,
        marginLeft: 30,
        borderLeft: `1px solid ${theme.colors.gray[3]}`,
        '&:hover': {
          backgroundColor: theme.colors.gray[0],
        },
      })}
      key={child.label}
    >
      {child.label}
    </Text>
  ));

  return (
    <>
      <UnstyledButton
        component={Link}
        href={link}
        onClick={() => setOpened((o) => !o)}
        px="md"
        py="sm"
        fw={500}
        w="100%"
        display="block"
        sx={(theme) => ({
          '&:hover': {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasChild && (
            <IconChevronRight
              size="1rem"
              stroke={1.5}
              style={{
                transition: 'transform 200ms ease',
                transform: opened ? 'rotate(90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasChild && (
        <Collapse in={opened}>{items}</Collapse>
      )}
    </>
  );
}

export default NavbarItem;