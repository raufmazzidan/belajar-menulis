import { Paper, Text } from '@mantine/core';
import React from 'react';

const DottedPreview = (props) => {
  return (
    <Paper withBorder sx={{ minHeight: 124, overflow: 'auto' }} px={16}>
      <Text fz={80} ff="Print Dashed" align="center" sx={{ display: 'inline-block' }}>
        {props.content}
      </Text>
    </Paper>
  );
};

export default DottedPreview;
