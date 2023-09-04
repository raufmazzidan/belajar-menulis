import Logo from '@/components/atoms/Logo';
import { Anchor, Box, Button, Divider, Flex, Grid, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core';
import React from 'react';
import Kids from '@/assets/kids.jpg';
import useWindowSize from '@/utils/hooks/useWindowSize';
import Link from 'next/link';
import { validateRegister } from '../utils/validate';
import { useForm } from '@mantine/form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import popup from '@/utils/popup';
import { auth, db } from '@/config/firebase';
import { addDoc, doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const isMobile = useWindowSize({ type: 'max', limit: 'sm' });

  const form = useForm({
    validate: validateRegister,
    validateInputOnChange: true,
  });

  const onSubmit = (value) => {
    createUserWithEmailAndPassword(auth, value.email, value.password)
      .then(async ({ user }) => {
        try {
          const ref = doc(db, 'user', user.uid);
          const payload = {
            fullName: value.fullName,
            role: 'mentor',
            email: user.email,
          };
          await setDoc(ref, payload);
          await localStorage.setItem('user', JSON.stringify(payload));
          popup.alert({ type: 'success', message: 'Akun anda berhasil terdaftar!' });
          window.location.href = '/';
        } catch (error) {
          popup.alert({ type: 'error', message: error.message });
        }
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
              <Title order={1}>Register</Title>
              <Text fz="sm" color="gray">
                Buat akun untuk memulai menggunakan belajarmenulis
              </Text>
              <form onSubmit={form.onSubmit(onSubmit)}>
                <Stack w="100%" mt={32}>
                  <TextInput
                    placeholder="Masukkan nama lengkap"
                    label="Nama Lengkap"
                    withAsterisk
                    {...form.getInputProps('fullName')}
                  />
                  <TextInput placeholder="Masukkan email" label="Email" withAsterisk {...form.getInputProps('email')} />
                  <PasswordInput
                    placeholder="Masukkan password"
                    label="Password"
                    withAsterisk
                    {...form.getInputProps('password')}
                  />
                  <Button type="submit" mt={24}>
                    Register
                  </Button>
                </Stack>
              </form>
              <Divider my={32} />
              <Text fz="sm" align="center">
                Punya akun?{' '}
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

export default Register;
