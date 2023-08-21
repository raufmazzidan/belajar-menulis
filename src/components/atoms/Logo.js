import { Box, Flex, Title } from '@mantine/core';
import React from 'react';

const Logo = () => {
  return (
    <Flex align="end" gap={3}>
      <Title color='violet.6' sx={{ letterSpacing: -3 }} order={1}>belajar menulis</Title>
      <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: 'red', marginBottom: 7 }} />
    </Flex>
  )
}

export default Logo;