import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import Information from '@/components/atoms/Information';
import States from '@/components/atoms/States';
import { db } from '@/config/firebase';
import { getUserData } from '@/utils/common';
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
import { collection, getDocs, query, where } from 'firebase/firestore';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import imageEmptyData from '@/assets/empty-data.svg';
import { modals } from '@mantine/modals';
import popup from '@/utils/popup';

const MainMentee = () => {
  const isMobile = useWindowSize({ type: 'max', limit: 'sm' });
  const user = getUserData();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const ref = query(collection(db, 'user'), where('mentor', '==', user.uid));
    try {
      const response = await getDocs(ref);
      const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setData(data);
      setLoading(false);
    } catch (error) {
      setData([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.uid) {
      getData();
    }
  }, [user.uid]);

  const deleteData = (uid) => () => {
    popup.loading();
    fetch(`/api/user/${uid}`, {
      headers: { Authorization: user.accessToken },
      method: 'DELETE',
    })
      .then(() => {
        getData();
        popup.closeAll();
        popup.alert({ type: 'success', message: 'Successfully delete data.' });
      })
      .catch(() => {
        popup.alert({ type: 'error', message: 'Failed delete data.' });
      });
  };

  const onDeleteData = (id) => () => {
    modals.openConfirmModal({
      centered: true,
      title: <Title order={5}>Are you sure want delete your data?</Title>,
      children: <Text size="sm">Please check again carefully. Your data will be deleted once it is submitted.</Text>,
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      onConfirm: deleteData(id),
    });
  };

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
          <ActionIcon variant="outline" color="violet" component={Link} href="/mentee/create">
            <IconPlus size="1.125rem" />
          </ActionIcon>
        </Group>
        <Divider my={16} />
        {loading ? (
          <>loading</>
        ) : (
          <>
            {data.length ? (
              <>
                {isMobile ? (
                  <Accordion variant="contained">
                    {data?.map(({ email, fullName, createdDate, lastUpdate, pin, id }, index) => (
                      <Accordion.Item key={index} value={`${email}-${index}`} sx={{ background: 'white !important' }}>
                        <Accordion.Control sx={{ background: 'white !important' }}>
                          <Group noWrap>
                            <Avatar radius="xl" size="md" />
                            <div>
                              <Text>{fullName}</Text>
                              <Text size="sm" color="dimmed" weight={400}>
                                {email}
                              </Text>
                            </div>
                          </Group>
                        </Accordion.Control>
                        <Accordion.Panel>
                          <Stack>
                            <Information title="Nama Mentee" value={fullName} />
                            <Information title="Email" value={email} />
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
                                  <ActionIcon
                                    variant="outline"
                                    color="yellow"
                                    component={Link}
                                    href={`/mentee/edit/${id}`}
                                  >
                                    <IconPencil size="1.125rem" />
                                  </ActionIcon>
                                  <ActionIcon variant="outline" color="red" onClick={onDeleteData(id)}>
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
                    {data?.map(({ fullName, email, createdDate, lastUpdate, pin, id }, index) => {
                      return (
                        <Paper
                          component={Flex}
                          radius={0}
                          withBorder
                          p={16}
                          gap={16}
                          key={index}
                          mt={index > 0 ? -1 : 0}
                        >
                          <Grid gutter={16} sx={{ flexGrow: 1 }} grow>
                            <Grid.Col md={6} lg={4} xl={3} xs={12}>
                              <Information title="Nama Mentee" value={fullName} />
                            </Grid.Col>
                            <Grid.Col md={6} lg={4} xl={2} xs={12}>
                              <Information title="Email" value={email} />
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
                                <ActionIcon
                                  variant="outline"
                                  color="yellow"
                                  component={Link}
                                  href={`/mentee/edit/${id}`}
                                >
                                  <IconPencil size="1.125rem" />
                                </ActionIcon>
                                <ActionIcon variant="outline" color="red" onClick={onDeleteData(id)}>
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
              </>
            ) : (
              <States
                image={imageEmptyData.src}
                message="Data Not Found"
                description="Tidak ada hasil yang sesuai dengan permintaan Anda"
              />
            )}
          </>
        )}
      </Paper>
    </>
  );
};

export default MainMentee;
