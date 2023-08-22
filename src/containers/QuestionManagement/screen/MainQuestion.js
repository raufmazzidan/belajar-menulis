import { ActionIcon, Box, Button, Divider, Grid, Group, Input, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import React, { useState } from 'react';
import { Raleway_Dots } from 'next/font/google'
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { IconPencil, IconPlus, IconSearch } from '@tabler/icons-react';
import ListPacks from '../element/ListPacks';
import Link from 'next/link';
import States from '@/components/atoms/States';
import imageEmptyData from '@/assets/empty-data.svg';
import useWindowSize from '@/utils/hooks/useWindowSize';
import DottedPreview from '@/components/atoms/DottedPreview';
import Information from '@/components/atoms/Information';

// If loading a variable font, you don't need to specify the font weight
const dots = Raleway_Dots({ subsets: ['latin'], weight: ['400'] })

const MainQuestion = () => {
  const isMobile = useWindowSize({ type: 'max', limit: 'md' });

  const [data, setData] = useState([
    {
      id: 'id_1',
      title: 'Alfabet Bergaris Huruf A-E',
      type: 'Huruf Bergaris',
      lastUpdate: '12/12/2022',
      createdDate: '12/12/2022',
      items: [
        { question: 'AaBbCc', answer: 'AaBbCc' },
      ]
    },
    {
      id: 'id_2',
      title: 'Alfabet Bergaris Huruf a-e',
      type: 'Huruf Bergaris',
      createdDate: '12/11/2022',
      lastUpdate: '22/22/2022',
      items: [
        { question: 'aaaaaa', answer: 'aaaaaa' },
        { question: 'bbbbbb', answer: 'bbbbbb' },
        { question: 'cccccc', answer: 'cccccc' },
        { question: 'dddddd', answer: 'dddddd' },
        { question: 'eeeeee', answer: 'eeeeee' },
      ]
    },
    {
      id: 'id_3',
      title: 'Alfabet Bergaris Huruf A-E',
      type: 'Huruf Bergaris',
      lastUpdate: '12/12/2022',
      createdDate: '12/12/2022',
      items: [
        { question: 'AaBbCc', answer: 'AaBbCc' },
        { question: 'AaBbCc', answer: 'AaBbCc' },
        { question: 'AaBbCc', answer: 'AaBbCc' },
        { question: 'AaBbCc', answer: 'AaBbCc' },
        { question: 'AaBbCc', answer: 'AaBbCc' },
        { question: 'AaBbCc', answer: 'AaBbCc' },
        { question: 'AaBbCc', answer: 'AaBbCc' },
        { question: 'AaBbCc', answer: 'AaBbCc' },
        { question: 'AaBbCc', answer: 'AaBbCc' },
        { question: 'AaBbCc', answer: 'AaBbCc' },
      ]
    },
    {
      id: 'id_4',
      title: 'Alfabet Bergaris Huruf A-E',
      type: 'Huruf Bergaris',
      lastUpdate: '12/12/2022',
      createdDate: '12/12/2022',
      items: [
        { question: 'xxssxsx', answer: 'xxssxsx' },
        { question: 'akjsdlak', answer: 'akjsdlak' },
        { question: 'xxssxsx', answer: 'xxssxsx' },
        { question: 'akjsdlak', answer: 'akjsdlak' },
        { question: 'xxssxsx', answer: 'xxssxsx' },
        { question: 'akjsdlak', answer: 'akjsdlak' },
        { question: 'xxssxsx', answer: 'xxssxsx' },
        { question: 'akjsdlak', answer: 'akjsdlak' },
        { question: 'xxssxsx', answer: 'xxssxsx' },
        { question: 'akjsdlak', answer: 'akjsdlak' },
      ]
    }
  ])

  const [active, setActive] = useState({ items: [] })

  return (
    <>
      <Box mb={32}>
        <Breadcrumbs data={[{ label: 'Question Management' }]} />
      </Box>
      <Paper radius={0} withBorder>
        <Grid gutter={0}>
          <Grid.Col span={isMobile ? 12 : 5}>
            <Box
              px={32}
              pb={32}
              sx={(theme) => ({
                borderRight: isMobile ? 'none' : `1px solid ${theme.colors.gray[3]}`,
                height: '100%',
                maxHeight: isMobile ? "70vh" : "100%",
                overflow: 'auto',
                position: 'relative'
              })}
            >
              <Box sx={{ position: 'sticky', top: 0, background: 'white', }} pt={32} pb={16}>
                <Group position='apart'>
                  <Group spacing={8}>
                    <Title order={4}>Question Pack</Title>
                    {/* <Badge radius="xs">
                    10
                  </Badge> */}
                  </Group>
                  <ActionIcon variant='outline' color='violet' component={Link} href="/question/create">
                    <IconPlus size="1.125rem" />
                  </ActionIcon>
                </Group>
                <Divider my={16} />
                <Input
                  icon={<IconSearch size="1rem" />}
                  placeholder="Search pack"
                />
              </Box>
              <Box>
                <ListPacks
                  data={data}
                  active={active}
                  setData={setData}
                  setActive={setActive}
                />
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col
            span={isMobile ? 12 : 7}
            sx={(theme) => ({
              borderTop: isMobile ? `1px solid ${theme.colors.gray[3]}` : 'none'
            })}
          >
            <Box sx={{ minHeight: 'calc(100vh - 248px)' }} p={32}>
              {/* <Group position='center' pt={200}>
                <Loader />
              </Group> */}
              {active.items?.length ? (
                <>
                  <Group>
                    <Title order={4}>{active.title}</Title>
                    <ActionIcon variant='outline' color='yellow' component={Link} href="/question/edit/id">
                      <IconPencil size="1.125rem" />
                    </ActionIcon>
                  </Group>
                  <Divider my={16} />
                  <Grid >
                    <Grid.Col span={6}>
                      <Information title="Tipe" value={active.type} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Information title="Jumlah Question" value={active.items.length} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Information title="Tanggal Dibuat" value={active.createdDate} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                      <Information title="Tanggal Diedit" value={active.lastUpdate} />
                    </Grid.Col>
                    <Grid.Col span={12}>
                      <Information
                        title="Question Item"
                        value={(
                          <Stack mt={10} spacing={16}>
                            {active.items.map(({ question }, i) => (
                              <Grid key={i}>
                                <Grid.Col span={"content"}>
                                  <Box
                                    bg="violet"
                                    sx={{
                                      alignItems: 'center',
                                      borderRadius: '50%',
                                      color: 'white',
                                      display: 'flex',
                                      height: 32,
                                      justifyContent: 'center',
                                      width: 32
                                    }}
                                  >
                                    <Text fz={16} fw={500}>
                                      {i + 1}
                                    </Text>
                                  </Box>
                                </Grid.Col>
                                <Grid.Col span={isMobile ? 12 : "auto"}>
                                  <DottedPreview content={question} />
                                </Grid.Col>
                              </Grid>
                            ))}
                          </Stack>
                        )}
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
  )
}

export default MainQuestion;