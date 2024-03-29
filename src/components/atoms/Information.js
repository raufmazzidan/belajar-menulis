import { Box, Stack, Text, Title } from '@mantine/core';
import React from 'react';

const Information = ({ title, value }) => {
  let content = <Text>{value}</Text>;

  if (typeof value !== 'string') {
    content = <Box mt={6}>{value}</Box>;
  }

  if (!value) {
    content = <Text>-</Text>;
  }

  return (
    <Stack spacing={4}>
      <Title order={6} color="gray.6">
        {title}
      </Title>
      {content}
    </Stack>
  );
};

export default Information;
