import Logo from '@/components/atoms/Logo';
import { Anchor, Box, Button, Divider, Flex, Grid, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import React from 'react';
import Kids from '@/assets/kids.jpg';
import useWindowSize from '@/utils/hooks/useWindowSize';
import Link from 'next/link';
import { useForm } from '@mantine/form';
import { validateLogin } from '../utils/validate';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/config/firebase';
import popup from '@/utils/popup';
import { doc, getDoc } from 'firebase/firestore';
import { logout } from '@/utils/common';

const Login = () => {
  const isMobile = useWindowSize({ type: 'max', limit: 'sm' });

  const form = useForm({
    validate: validateLogin,
    validateInputOnChange: true,
  });

  const onSubmit = (value) => {
    signInWithEmailAndPassword(auth, value.email, value.password)
      .then(({ user }) => {
        const ref = doc(db, 'user', user.uid);
        getDoc(ref)
          .then((res) => {
            if (res.data()) {
              localStorage.setItem('user', JSON.stringify({ ...user, ...res.data() }));
              window.location.href = '/';
            } else {
              popup.alert({ type: 'error', message: 'User not found!' });
              logout();
            }
          })
          .catch(() => {
            popup.alert({ type: 'error', message: 'User not found!' });
            logout();
          });
      })
      .catch(() => {
        popup.alert({ type: 'error', message: 'Email atau Password yang anda Input salah' });
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
              <Title order={1}>Login</Title>
              <Text fz="sm" color="gray">
                Masuk ke akun anda
              </Text>
              <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack w="100%" mt={32}>
                  <TextInput placeholder="Masukkan email" label="Email" withAsterisk {...form.getInputProps('email')} />
                  <PasswordInput
                    placeholder="Masukkan password"
                    label="Password"
                    withAsterisk
                    {...form.getInputProps('password')}
                  />
                  <Anchor sx={{ textAlign: 'right' }} fz="sm">
                    Lupa password?
                  </Anchor>
                  <Button type="submit">Login</Button>
                </Stack>
              </form>
              <Divider my={32} />
              <Text fz="sm" align="center">
                Tidak punya akun?{' '}
                <Anchor component={Link} href="/register">
                  Daftar disini.
                </Anchor>
              </Text>
            </Stack>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Login;
