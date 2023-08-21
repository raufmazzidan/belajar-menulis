import { Box, Stack, Text, Title } from '@mantine/core';
import Image from 'next/image';
import React from 'react';

const States = (props) => {
  return (
    <Stack align='center' spacing={8} p={32}>
      <Image src={props.image} alt='error' width={300} height={180} />
      <Stack w="90%" spacing={4} >
        <Title align='center' order={3}>{props.message}</Title>
        <Text align='center' size="sm">{props.description}</Text>
      </Stack>
    </Stack>
  )
}

export default States;