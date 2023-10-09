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
import { IconCheck, IconX } from '@tabler/icons-react';
import { collection, getDocs, query, doc, getDoc, where, orderBy } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import Draw from '../element/Draw';
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  LineChart,
  Line,
} from 'recharts';
import States from '@/components/atoms/States';
import imageEmptyData from '@/assets/empty-data.svg';

const COLOR = [
  '#3366cc',
  '#dc3912',
  '#ff9900',
  '#109618',
  '#990099',
  '#0099c6',
  '#dd4477',
  '#66aa00',
  '#b82e2e',
  '#316395',
  '#3366cc',
  '#994499',
  '#22aa99',
  '#aaaa11',
  '#6633cc',
  '#e67300',
  '#8b0707',
  '#651067',
  '#329262',
  '#5574a6',
  '#3b3eac',
  '#b77322',
  '#16d620',
  '#b91383',
  '#f4359e',
  '#9c5935',
  '#a9c413',
  '#2a778d',
  '#668d1c',
  '#bea413',
  '#0c5922',
  '#743411',
];

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
    let result = {};
    mentee.forEach(({ id: menteeId }) => {
      question.forEach(async ({ id: questionId }) => {
        const ref = doc(db, 'report', menteeId, 'answered_question', questionId);
        try {
          const response = await getDoc(ref);
          const { answers } = response.data() || { answers: [] };
          result[menteeId] = {
            ...result[menteeId],
            [questionId]: {
              answers: answers || [],
            },
          };
          setLoading(false);
        } catch (error) {
          setReport(null);
          setLoading(false);
        }
      });
    });
    setReport(result);
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

  const getTotalRetryCount = useCallback(() => {
    if (!mentee.length || !report || !question.length) {
      return null;
    }

    let res = {};

    mentee.forEach(({ id: menteeId }) => {
      const x = report[menteeId] || {};

      question.forEach(({ id: questionId, items }) => {
        items.forEach((a, index) => {
          const retryCount = x[questionId]?.answers[index]?.retryCount || 0;
          if (retryCount) {
            if (res[questionId]) {
              res[questionId][index] = (res[questionId][index] || 0) + retryCount;
            } else {
              res[questionId] = [];
              res[questionId][index] = (res[questionId][index] || 0) + retryCount;
            }
          }
        });
      });
    });

    return res;
  }, [mentee, report, question]);

  return (
    <>
      <Box mb={32}>
        <Breadcrumbs data={[{ label: 'Question Analysis' }]} />
      </Box>
      <Skeleton visible={loading}>
        <Paper withBorder radius={0} p={16}>
          <Title order={4}>Total Percobaan Menjawab</Title>
          <Divider my={16} />
          <Box sx={{ overflowX: 'auto', overflowY: 'hidden' }}>
            {getTotalRetryCount() ? (
              <Box h={400} sx={{ minWidth: 800 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    style={{ fontSize: 14 }}
                    width={500}
                    height={300}
                    data={[1, 2, 3, 4, 5].map((num) => {
                      let value = {};

                      question.forEach(({ id }) => {
                        const quest = getTotalRetryCount()[id];
                        if (quest && quest[num - 1]) {
                          value[id] = quest[num - 1];
                        }
                      });

                      return {
                        name: `Nomor ${num}`,
                        ...value,
                      };
                    })}
                    margin={{
                      top: 8,
                      right: 30,
                      left: 8,
                      bottom: 8,
                    }}
                  >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="name" padding={{ left: 32, right: 32 }} />
                    <YAxis />
                    <ChartTooltip
                      formatter={(value, name) => {
                        let res = {};
                        question.forEach(({ id, title }) => {
                          res[id] = title;
                        });

                        return [value, res[name]];
                      }}
                    />
                    <Legend
                      formatter={(value, entry) => {
                        let res = {};
                        question.forEach(({ id, title }) => {
                          res[id] = title;
                        });

                        return res[value];
                      }}
                    />
                    {Object.keys(getTotalRetryCount() || {}).map((id, i) => (
                      <Line type="linear" dataKey={id} stroke={COLOR[i]} key={id} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <States
                image={imageEmptyData.src}
                message="Data Not Found"
                description="Tidak ada hasil yang sesuai dengan permintaan Anda"
              />
            )}
          </Box>
        </Paper>
      </Skeleton>
      <Divider my={32} />
      <Box mb={32}>
        <Breadcrumbs data={[{ label: 'Mentee Result' }]} />
      </Box>
      {mentee.length ? (
        <>
          {mentee.map(({ fullName, id: userId }, i) => (
            <Skeleton visible={loading} key={i} mb={16}>
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
                                        <Box sx={{ position: 'relative', minHeight: 72 }}>
                                          <DottedPreview content={question} size="small" />
                                          <Box sx={{ position: 'absolute', top: 0, width: '100%' }}>
                                            <Draw points={result?.points} />
                                          </Box>
                                        </Box>
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
        </>
      ) : (
        <States
          image={imageEmptyData.src}
          message="Data Not Found"
          description="Tidak ada hasil yang sesuai dengan permintaan Anda"
        />
      )}
    </>
  );
};

export default Report;
