import { ActionIcon, Box, Divider, Flex, Grid, Group, Input, Paper, Skeleton, Stack, Text, Title } from '@mantine/core';
import React from 'react';
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import ListPacks from '../element/ListPacks';
import Link from 'next/link';
import States from '@/components/atoms/States';
import imageEmptyData from '@/assets/empty-data.svg';
import DottedPreview from '@/components/atoms/DottedPreview';
import Information from '@/components/atoms/Information';
import useMainQuestion from '../hooks/useMainQuestion';
import dateFormat from '@/utils/dateFormat';

const MainQuestion = () => {
  const { active, data, onDeleteData, isMobile, loading, setData } = useMainQuestion();

  return (
    <>
      <Box mb={32}>
        <Breadcrumbs data={[{ label: 'Question Management' }]} />
      </Box>
      <Paper radius={0} withBorder>
        <Grid gutter={0}>
          <Grid.Col span={isMobile ? 12 : 'content'}>
            <Box
              px={32}
              pb={32}
              sx={(theme) => ({
                borderRight: isMobile ? 'none' : `1px solid ${theme.colors.gray[3]}`,
                height: '100%',
                maxHeight: isMobile ? '70vh' : '100%',
                overflow: 'auto',
                position: 'relative',
                width: isMobile ? 'auto' : 440,
              })}
            >
              <Box sx={{ position: 'sticky', top: 0, background: 'white' }} pt={32}>
                <Group position="apart">
                  <Group spacing={8}>
                    <Title order={4}>Question Pack</Title>
                  </Group>
                  <ActionIcon variant="outline" color="violet" component={Link} href="/question/create">
                    <IconPlus size="1.125rem" />
                  </ActionIcon>
                </Group>
                <Divider my={16} />
                {/* <Input icon={<IconSearch size="1rem" />} placeholder="Search pack" /> */}
              </Box>
              <Box>
                {loading ? (
                  <Skeleton height={400} />
                ) : (
                  <>
                    {data.length > 0 ? (
                      <ListPacks data={data} setData={setData} />
                    ) : (
                      <States
                        image={imageEmptyData.src}
                        message="Data Not Found"
                        description="Tidak ada hasil yang sesuai dengan permintaan Anda"
                      />
                    )}
                  </>
                )}
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col
            span={isMobile ? 12 : 'auto'}
            sx={(theme) => ({
              borderTop: isMobile ? `1px solid ${theme.colors.gray[3]}` : 'none',
            })}
          >
            <Box sx={{ minHeight: 'calc(100vh - 248px)' }} p={32}>
              {active.items?.length ? (
                <>
                  <Flex gap={16}>
                    <Title order={4}>{active.title}</Title>
                    <ActionIcon variant="outline" color="yellow" component={Link} href={`/question/edit/${active.id}`}>
                      <IconPencil size="1.125rem" />
                    </ActionIcon>
                    <ActionIcon variant="outline" color="red" onClick={onDeleteData(active.id)}>
                      <IconTrash size="1.125rem" />
                    </ActionIcon>
                  </Flex>
                  <Divider my={16} />
                  <Grid>
                    <Grid.Col span={6}>
                      <Information title="Tipe" value={active.type} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Information title="Jumlah Question" value={active.items.length} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Information
                        title="Tanggal Dibuat"
                        value={dateFormat({ date: active.createdDate, format: 'dd/MM/yyyy hh:mm' })}
                      />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Information
                        title="Tanggal Diedit"
                        value={dateFormat({ date: active.lastUpdate, format: 'dd/MM/yyyy hh:mm' })}
                      />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Information
                        title="Question Item"
                        value={
                          <Stack mt={10} spacing={16}>
                            {active.items.map(({ question }, i) => (
                              <Grid key={i}>
                                <Grid.Col span={'content'}>
                                  <Box
                                    bg="violet"
                                    sx={{
                                      alignItems: 'center',
                                      borderRadius: '50%',
                                      color: 'white',
                                      display: 'flex',
                                      height: 32,
                                      justifyContent: 'center',
                                      width: 32,
                                    }}
                                  >
                                    <Text fz={16} fw={500}>
                                      {i + 1}
                                    </Text>
                                  </Box>
                                </Grid.Col>
                                <Grid.Col span={isMobile ? 12 : 'auto'}>
                                  <DottedPreview content={question} />
                                </Grid.Col>
                              </Grid>
                            ))}
                          </Stack>
                        }
                      />
                    </Grid.Col>
                  </Grid>
                </>
              ) : (
                <States
                  image={imageEmptyData.src}
                  message="Data Not Found"
                  description="Tidak ada hasil yang sesuai dengan permintaan Anda"
                />
              )}
            </Box>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};

export default MainQuestion;
