import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import DottedPreview from '@/components/atoms/DottedPreview';
import { db } from '@/config/firebase';
import { getUserData } from '@/utils/common';
import {
  Accordion,
  Box,
  Divider,
  Flex,
  Grid,
  Paper,
  Progress,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconAlphabetGreek, IconCheck, IconListNumbers, IconUsersGroup, IconX } from '@tabler/icons-react';
import { collection, getDocs, query, doc, getDoc, where, orderBy } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';

const Report = () => {
  const user = getUserData();

  const [mentee, setMentee] = useState([]);

  const [loading, setLoading] = useState(true);

  const getMentee = async () => {
    setLoading(true);
    try {
      const ref = query(collection(db, 'user'), where('mentor', '==', user.uid));
      const response = await getDocs(ref);
      const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMentee(data);
    } catch (error) {
      setMentee([]);
    }
  };

  const [question, setQuestion] = useState([]);

  const getQuestion = async () => {
    setLoading(true);
    try {
      const ref = query(collection(db, 'question'), where('createdBy', '==', user?.uid), orderBy('level', 'asc'));
      const response = await getDocs(ref);
      const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestion(data);
    } catch (error) {
      setQuestion([]);
    }
  };

  const [report, setReport] = useState(null);

  const getData = async () => {
    setLoading(true);
    mentee.forEach(({ id: menteeId }) => {
      question.forEach(async ({ id: questionId }) => {
        const ref = doc(db, 'report', menteeId, 'answered_question', questionId);
        try {
          const response = await getDoc(ref);
          const { answers } = response.data() || { answers: [] };

          setReport((_prev) => {
            const prev = _prev ?? {};
            return {
              [menteeId]: {
                ...prev[menteeId],
                [questionId]: {
                  answers: answers || [],
                },
              },
            };
          });
          setLoading(false);
        } catch (error) {
          setReport(null);
          setLoading(false);
        }
      });
    });
  };

  useEffect(() => {
    getData();
  }, [mentee, question]);

  useEffect(() => {
    if (user.uid) {
      getMentee();
      getQuestion();
    }
  }, [user.uid]);

  const totalQuestionItem = useMemo(() => {
    return question.reduce((a, b) => a + b.items.length, 0);
  }, [question]);

  return (
    <>
      <Box mb={40}>
        <Breadcrumbs data={[{ label: 'General Report' }]} />
        <Grid mt={24}>
          <Grid.Col xs={12} md={4} lg={3}>
            <Skeleton visible={loading}>
              <Paper withBorder radius={0} p={24} sx={{ position: 'relative' }}>
                <Title>{mentee.length}</Title>
                <Text mt={16}>Total Mentee</Text>
                <Text component="span" color="violet.2" sx={{ position: 'absolute', top: 16, right: 16 }}>
                  <IconUsersGroup size={64} />
                </Text>
              </Paper>
            </Skeleton>
          </Grid.Col>
          <Grid.Col xs={12} md={4} lg={3}>
            <Skeleton visible={loading}>
              <Paper withBorder radius={0} p={24} sx={{ position: 'relative' }}>
                <Title>{question.length}</Title>
                <Text mt={16}>Total Question</Text>
                <Text component="span" color="orange.2" sx={{ position: 'absolute', top: 0, right: 0 }}>
                  <IconAlphabetGreek size={80} />
                </Text>
              </Paper>
            </Skeleton>
          </Grid.Col>
          <Grid.Col xs={12} md={4} lg={3}>
            <Skeleton visible={loading}>
              <Paper withBorder radius={0} p={24} sx={{ position: 'relative' }}>
                <Title>{totalQuestionItem}</Title>
                <Text mt={16}>Total Question Item</Text>
                <Text component="span" color="pink.2" sx={{ position: 'absolute', top: 8, right: 8 }}>
                  <IconListNumbers size={64} />
                </Text>
              </Paper>
            </Skeleton>
          </Grid.Col>
        </Grid>
      </Box>
      <Divider />
      {!!mentee.length && (
        <Box mt={32}>
          <Breadcrumbs data={[{ label: 'Mentee Result' }]} />
          {mentee.map(({ fullName, id: userId }, i) => (
            <Skeleton visible={loading} key={i} mt={16}>
              <Paper radius={0} withBorder p={32}>
                <Title order={4}>{fullName}</Title>
                <Divider my={16} />
                <Grid>
                  {question.map(({ title, items, level, id: questionId }, j) => {
                    const answers =
                      (report && report[userId] && report[userId] && report[userId][questionId]?.answers) || [];
                    const finsihed = answers.filter(({ correct }) => !!correct);

                    const progress = (finsihed.length / items.length) * 100;
                    return (
                      <Grid.Col xs={12} md={6} lg={4} key={j}>
                        <Accordion variant="contained">
                          <Accordion.Item key={j} value={`${title}-${j}`} sx={{ background: 'white !important' }}>
                            <Accordion.Control sx={{ background: 'white !important' }}>
                              <Stack spacing={16}>
                                <div>
                                  <Title order={6}>{title}</Title>
                                  <Text size="xs">(Level {level})</Text>
                                </div>
                                <Flex align="center" gap={8}>
                                  <Box w="100%">
                                    <Progress color={progress === 100 ? 'green' : 'violet'} value={progress} />
                                  </Box>
                                  <Text size="xs" color="gray">
                                    {progress}%
                                  </Text>
                                </Flex>
                              </Stack>
                            </Accordion.Control>
                            <Accordion.Panel>
                              <Stack>
                                {items.map(({ question }, q) => {
                                  const result = answers[q] || null;
                                  let status = '';

                                  if (result?.correct === true) {
                                    status = 'correct';
                                  } else if (result?.correct === false) {
                                    status = 'incorrect';
                                  } else {
                                    status = 'empty';
                                  }

                                  const tooltipLabel = {
                                    correct: 'Benar',
                                    incorrect: 'Salah',
                                    empty: 'Belum Dikerjakan',
                                  }[status];
                                  const color = { correct: 'green', incorrect: 'red', empty: 'gray' }[status];
                                  const Icon = {
                                    correct: <IconCheck size="1rem" />,
                                    incorrect: <IconX size="1rem" />,
                                    empty: <Text>{q + 1}</Text>,
                                  }[status];

                                  return (
                                    <Flex key={q} gap={8}>
                                      <Tooltip label={tooltipLabel} color={color}>
                                        <ThemeIcon color={color} size={24} radius="xl">
                                          {Icon}
                                        </ThemeIcon>
                                      </Tooltip>
                                      <Box sx={{ flexGrow: 1 }}>
                                        <DottedPreview content={question} size="small" />
                                        <Box mt={8}>
                                          {!!result ? (
                                            <Text size="xs">Total Percobaan Menjawab : {result?.retryCount}</Text>
                                          ) : (
                                            <Box sx={{ height: '18.59px' }} />
                                          )}
                                        </Box>
                                      </Box>
                                    </Flex>
                                  );
                                })}
                              </Stack>
                            </Accordion.Panel>
                          </Accordion.Item>
                        </Accordion>
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </Paper>
            </Skeleton>
          ))}
        </Box>
      )}
    </>
  );
};

export default Report;
