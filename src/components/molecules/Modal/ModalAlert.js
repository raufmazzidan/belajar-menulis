import { Box, Button, Stack, Title, useMantineTheme } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
import React from 'react';

const ModalAlert = ({ context, id, innerProps: { message, type } }) => {
  const theme = useMantineTheme();

  const color = {
    success: theme.colors.green[7],
    error: theme.colors.red[7]
  }[type] || theme.colors.dark[7];

  return (
    <Stack align='center' spacing={16} my={32}>
      <Box
        sx={{
          border: `4px solid ${color}`,
          height: 80,
          width: 80,
          borderRadius: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <IconCheck size={48} color={color} />
      </Box>
      <Title order={4}>{message}</Title>
      <Button mt={16} onClick={() => context.closeModal(id)}>
        Okay
      </Button>
    </Stack>
  )
};

export default ModalAlert;