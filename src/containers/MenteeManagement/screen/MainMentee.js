import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import Information from '@/components/atoms/Information';
import dateFormat from '@/utils/dateFormat';
import useWindowSize from '@/utils/hooks/useWindowSize';
import {
  Accordion,
  ActionIcon,
  Avatar,
  Box,
  Divider,
  Flex,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { IconPencil, IconPlus, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const _DATA = [
  {
    menteeName: 'John Doe',
    username: 'johndoe',
    pin: '1122',
    createdDate: new Date().toJSON(),
    lastUpdate: new Date().toJSON(),
  },
  {
    menteeName: 'John Doe 2',
    username: 'johndoe',
    pin: '1122',
    createdDate: new Date().toJSON(),
    lastUpdate: new Date().toJSON(),
  },
];

const MainMentee = () => {
  const isMobile = useWindowSize({ type: 'max', limit: 'sm' });

  const data = _DATA;
  return (
    <>
      <Box mb={32}>
        <Breadcrumbs data={[{ label: 'Mentee Management' }]} />
      </Box>
      <Paper radius={0} withBorder p={32}>
        <Group position="apart">
          <Group spacing={8}>
            <Title order={4}>List Mentee</Title>
          </Group>
          <ActionIcon variant="outline" color="violet" component={Link} href="/question/create">
            <IconPlus size="1.125rem" />
          </ActionIcon>
        </Group>
        <Divider my={16} />
        {isMobile ? (
          <Accordion variant="contained">
            {data.map(({ menteeName, username, createdDate, lastUpdate, pin }, index) => (
              <Accordion.Item key={index} value={`${username}-${index}`} sx={{ background: 'white !important' }}>
                <Accordion.Control sx={{ background: 'white !important' }}>
                  <Group noWrap>
                    <Avatar radius="xl" size="md" />
                    <div>
                      <Text>John Doe</Text>
                      <Text size="sm" color="dimmed" weight={400}>
                        johndoe
                      </Text>
                    </div>
                  </Group>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack>
                    <Information title="Nama Mentee" value={menteeName} />
                    <Information title="Username" value={username} />
                    <Information title="PIN" value={pin} />
                    <Information
                      title="Tanggal Dibuat"
                      value={dateFormat({ date: createdDate, format: 'dd/MM/yyyy hh:mm' })}
                    />
                    <Information
                      title="Tanggal Diedit"
                      value={dateFormat({ date: lastUpdate, format: 'dd/MM/yyyy hh:mm' })}
                    />
                    <Information
                      title="Action"
                      value={
                        <Flex gap={16}>
                          <ActionIcon variant="outline" color="yellow" component={Link} href={`/`}>
                            <IconPencil size="1.125rem" />
                          </ActionIcon>
                          <ActionIcon variant="outline" color="red">
                            <IconTrash size="1.125rem" />
                          </ActionIcon>
                        </Flex>
                      }
                    />
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        ) : (
          <>
            {data.map(({ menteeName, username, createdDate, lastUpdate, pin }, index) => {
              return (
                <Paper component={Flex} radius={0} withBorder p={16} gap={16} key={index} mt={index > 0 ? -1 : 0}>
                  <Grid gutter={16} sx={{ flexGrow: 1 }} grow>
                    <Grid.Col md={6} lg={4} xl={3} xs={12}>
                      <Information title="Nama Mentee" value={menteeName} />
                    </Grid.Col>
                    <Grid.Col md={6} lg={4} xl={2} xs={12}>
                      <Information title="Username" value={username} />
                    </Grid.Col>
                    <Grid.Col md={6} lg={4} xl={1} xs={12}>
                      <Information title="PIN" value={pin} />
                    </Grid.Col>
                    <Grid.Col md={6} lg={4} xl={2} xs={12}>
                      <Information
                        title="Tanggal Dibuat"
                        value={dateFormat({ date: createdDate, format: 'dd/MM/yyyy hh:mm' })}
                      />
                    </Grid.Col>
                    <Grid.Col md={6} lg={4} xl={2} xs={12}>
                      <Information
                        title="Tanggal Diedit"
                        value={dateFormat({ date: lastUpdate, format: 'dd/MM/yyyy hh:mm' })}
                      />
                    </Grid.Col>
                    <Grid.Col md={6} lg={4} xl={'content'} xs={12} sx={{ alignSelf: 'center' }}>
                      <Flex gap={16}>
                        <ActionIcon variant="outline" color="yellow" component={Link} href={`/`}>
                          <IconPencil size="1.125rem" />
                        </ActionIcon>
                        <ActionIcon variant="outline" color="red">
                          <IconTrash size="1.125rem" />
                        </ActionIcon>
                      </Flex>
                    </Grid.Col>
                  </Grid>
                </Paper>
              );
            })}
          </>
        )}
      </Paper>
    </>
  );
};

export default MainMentee;
