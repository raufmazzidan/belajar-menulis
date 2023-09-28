import { Anchor, Box, Button, Center, Divider, Flex, Grid, Stack, Text, TextInput, Title } from '@mantine/core';
import React from 'react';
import Kids from '@/assets/kids.jpg';
import useWindowSize from '@/utils/hooks/useWindowSize';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { validateForgotPassword } from '../utils/validate';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/config/firebase';
import popup from '@/utils/popup';

const ForgotPassword = () => {
  const isMobile = useWindowSize({ type: 'max', limit: 'sm' });

  const form = useForm({
    validate: validateForgotPassword,
    validateInputOnChange: true,
  });

  const onSubmit = ({ email }) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        window.location.href = '/login';
        popup.alert({ type: 'success', message: 'Silahkan cek email anda untuk melakukan reset password' });
      })
      .catch((error) => {
        popup.alert({ type: 'error', message: error.message });
      });
  };

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid sx={{ height: '100%' }} gutter={0}>
        {!isMobile && (
          <Grid.Col
            span={6}
            sx={(theme) => ({
              background: theme.colors.gray[2],
              backgroundImage: `url(${Kids.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            })}
          />
        )}
        <Grid.Col span={isMobile ? 12 : 6}>
          <Flex align="center" justify="center" h="100%">
            <Stack spacing={8} sx={{ width: isMobile ? 320 : 400 }}>
              <Title order={1}>Lupa Password</Title>
              <Text fz="sm" color="gray">
                Masukkan email yang terdaftar untuk melakukan reset password
              </Text>
              <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack w="100%" mt={32}>
                  <TextInput placeholder="Masukkan email" label="Email" withAsterisk {...form.getInputProps('email')} />
                  <Center>
                    <Button type="submit" mt={24}>
                      Submit
                    </Button>
                  </Center>
                </Stack>
              </form>
              <Divider my={32} />
              <Text fz="sm" align="center">
                Ingat akun anda?{' '}
                <Anchor component={Link} href="/login">
                  Login disini.
                </Anchor>
              </Text>
            </Stack>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default ForgotPassword;
