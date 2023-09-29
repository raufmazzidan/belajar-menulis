import { db } from '@/config/firebase';
import { getUserData } from '@/utils/common';
import { Box, Grid, Paper, Skeleton, Text, Title } from '@mantine/core';
import { IconAlphabetGreek, IconListNumbers, IconUsersGroup } from '@tabler/icons-react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useMemo, useState } from 'react';

const Dashboard = () => {
  const user = getUserData();

  const [loadM, setLoadM] = useState(true);
  const [mentee, setMentee] = useState([]);
  const getMentee = async () => {
    setLoadM(true);
    try {
      const ref = query(collection(db, 'user'), where('mentor', '==', user.uid));
      const response = await getDocs(ref);
      const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMentee(data);
      setLoadM(false);
    } catch (error) {
      setMentee([]);
      setLoadM(false);
    }
  };

  const [loadQ, setLoadQ] = useState(true);
  const [question, setQuestion] = useState([]);
  const getQuestion = async () => {
    setLoadQ(true);
    try {
      const ref = query(collection(db, 'question'), where('createdBy', '==', user?.uid), orderBy('level', 'asc'));
      const response = await getDocs(ref);
      const data = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setQuestion(data);
      setLoadQ(false);
    } catch (error) {
      setLoadQ(false);
      setQuestion([]);
    }
  };

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
      <Box mb={16}>
        <Title order={2}>Hai, {user.fullName}!</Title>
        <Text order={4}>selamat datang pada dashboard anda</Text>
      </Box>
      <Grid mt={24}>
        <Grid.Col xs={12} md={4} lg={3}>
          <Skeleton visible={loadM}>
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
          <Skeleton visible={loadQ}>
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
          <Skeleton visible={loadQ}>
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
    </>
  );
};

export default Dashboard;
