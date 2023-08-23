import { ActionIcon, Box, Button, Divider, Flex, Grid, Group, Input, Loader, Paper, Skeleton, Stack, Text, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { Raleway_Dots } from 'next/font/google'
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { IconCheck, IconPencil, IconPlus, IconSearch, IconTrash } from '@tabler/icons-react';
import ListPacks from '../element/ListPacks';
import Link from 'next/link';
import States from '@/components/atoms/States';
import imageEmptyData from '@/assets/empty-data.svg';
import useWindowSize from '@/utils/hooks/useWindowSize';
import DottedPreview from '@/components/atoms/DottedPreview';
import Information from '@/components/atoms/Information';
import { collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/config/firebase';

// If loading a variable font, you don't need to specify the font weight
const dots = Raleway_Dots({ subsets: ['latin'], weight: ['400'] })

const MainQuestion = () => {
  const isMobile = useWindowSize({ type: 'max', limit: 'md' });

  const [data, setData] = useState([])
  const [active, setActive] = useState({ items: [] })
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const ref = collection(db, 'question');
    try {
      const response = await getDocs(ref);
      const data = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(data)
      setLoading(false)
    } catch (error) {
      setData([])
      setLoading(false)
    }
  }


  const deleteData = (id) => async () => {
    const ref = doc(db, 'question', id);
    try {
      await deleteDoc(ref);
      setActive({ items: [] })
    } catch (error) {
      // setLoading(false)
    }
  }

  useEffect(() => {
    const ref = collection(db, 'question');
    const getRealtimeData = onSnapshot(
      ref,
      (response) => {
        const data = response.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(data);
        setLoading(false);
      },
      () => {
        setLoading(false)
      });

    return () => {
      getRealtimeData()
    }
  }, [])

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
                {loading ? (
                  <Skeleton height={400} />
                ) : (
                  <>
                    {data.length > 0 ? (
                      <ListPacks
                        data={data}
                        active={active}
                        setData={setData}
                        setActive={setActive}
                      />
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
                  <Flex gap={16}>
                    <Title order={4}>{active.title}</Title>
                    <ActionIcon variant='outline' color='yellow' component={Link} href="/question/edit/id">
                      <IconPencil size="1.125rem" />
                    </ActionIcon>
                    <ActionIcon variant='outline' color='red' onClick={deleteData(active.id)}>
                      <IconTrash size="1.125rem" />
                    </ActionIcon>
                  </Flex>
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