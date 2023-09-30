import { Paper, Text } from '@mantine/core';
import React from 'react';

const DottedPreview = ({ content, size = 'default' }) => {
  const variants = {
    small: {
      paper: { minHeight: 32, padding: '4px 8px 4px 8px' },
      text: { fontSize: 40, lineHeight: 'inherit' },
    },
    default: {
      paper: { minHeight: 124, padding: '0px 16px' },
      text: { fontSize: 80 },
    },
  }[size];

  return (
    <Paper withBorder sx={{ ...variants.paper, overflow: 'auto', textAlign: 'center' }}>
      <Text ff="Print Dashed" align="center" sx={{ display: 'inline-block', ...variants.text }}>
        {content}
      </Text>
    </Paper>
  );
};

export default DottedPreview;
