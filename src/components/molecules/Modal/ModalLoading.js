import { Loader, Stack, Title } from '@mantine/core';
import React from 'react';

const ModalLoading = () => (
  <Stack align="center" spacing={16} my={32}>
    <Loader size="xl" />
    <Title order={4}>Please wait.</Title>
  </Stack>
);

export default ModalLoading;
