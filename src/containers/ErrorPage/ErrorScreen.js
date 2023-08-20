import {
  createStyles,
  Image,
  Container,
  Title,
  Text,
  Button,
  SimpleGrid,
  rem,
  Box,
} from '@mantine/core';
import image from '@/assets/404.svg';
import useWindowSize from '@/utils/hooks/useWindowSize';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(80),
    paddingBottom: rem(80),
  },

  title: {
    fontWeight: 900,
    fontSize: rem(34),
    marginBottom: theme.spacing.md,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    [theme.fn.smallerThan('sm')]: {
      fontSize: rem(32),
    },
  },

  control: {
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  },

  mobileImage: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  desktopImage: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function ErrorScreen() {
  const { classes } = useStyles();

  const isMobile = useWindowSize({ type: 'max', limit: 'sm' })

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 80 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 80, justifyContent: 'center', flexDirection: isMobile ? 'column-reverse' : 'row' }}>
        <Box sx={{ maxWidth: 600 }}>
          <Title order={1} fz={34} fw={900} mb={8}>Something is not right...</Title>
          <Text color="dimmed" size="lg">
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Button component={Link} mt="xl" href="/">
            Get back to home page
          </Button>
        </Box>
        <Image src={image.src} alt='error' width={isMobile ? 300 : 424} />
      </Box>
    </Box>
  );
}