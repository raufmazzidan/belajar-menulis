import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { Box, Tabs, Text, Title } from '@mantine/core';
import ReportMentee from '../element/ReportMentee';
import React from 'react';

const Report = () => {
  return (
    <>
      <Box mb={32}>
        <Breadcrumbs data={[{ label: 'Report' }]} />
      </Box>
      <Tabs defaultValue="mentee">
        <Tabs.List>
          <Tabs.Tab value="mentee">
            <Text size="md" weight="500">
              Mentee
            </Text>
          </Tabs.Tab>
          <Tabs.Tab value="question">
            <Text size="md" weight="500">
              Question
            </Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="mentee">
          <ReportMentee />
        </Tabs.Panel>

        <Tabs.Panel value="question">Messages tab content</Tabs.Panel>
      </Tabs>
    </>
  );
};

export default Report;
