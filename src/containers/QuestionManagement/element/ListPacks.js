import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';
import { IconGridDots } from '@tabler/icons-react';
import { Box, Flex, Text, Title } from '@mantine/core';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useRouter } from 'next/router';
import { questionType } from '../utils/constant';
import { getUserData } from '@/utils/common';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ListPacks = ({ data, setData }) => {
  const router = useRouter();
  const user = getUserData();

  const [mentee, setMentee] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    const ref = query(collection(db, 'user'), where('mentor', '==', user.uid));
    try {
      const response = await getDocs(ref);
      const res = response.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMentee(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.uid) {
      getData();
    }
  }, [user.uid]);

  const onSort = async (datas) => {
    const isOnlyOneActive = datas.filter(({ active }) => !!active).length < 2;
    try {
      let firstQuestionId = '';
      await datas.forEach(async (data, index) => {
        const ref = doc(db, 'question', data.id);
        let payload = {
          level: index + 1,
        };

        if (isOnlyOneActive) {
          if (index === 0) {
            firstQuestionId = data.id;
            payload = {
              ...payload,
              active: true,
            };
          } else {
            payload = {
              ...payload,
              active: false,
            };
          }
        }

        await updateDoc(ref, payload);
        await mentee.forEach(async ({ id, ...d }) => {
          await fetch(`/api/user/${id}`, {
            headers: { Authorization: user.accessToken },
            method: 'PUT',
            body: JSON.stringify({
              ...d,
              finished: d?.finished?.length === 1 ? [firstQuestionId] : d.finished,
            }),
            contentType: 'application/json',
          });
        });
      });
    } catch (error) {
      console.log('sort failure');
    }
  };

  useEffect(() => {
    onSort(data);
  }, [data]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(data, result.source.index, result.destination.index);

    setData(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="packs">
        {(provided) => (
          <Box {...provided.droppableProps} ref={provided.innerRef}>
            {data.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Flex
                      gap={16}
                      align="center"
                      justify="space-between"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      onClick={() => router.replace({ query: { id: item.id } })}
                      sx={(theme) => ({
                        background: snapshot.isDragging
                          ? theme.colors.gray[0]
                          : item.id === router.query.id
                          ? theme.colors.violet[0]
                          : 'white',
                        padding: 16,
                        '&:hover': {
                          background: theme.colors.gray[1],
                        },
                        userSelect: 'none',
                        cursor: 'pointer',
                        minHeight: 80,
                        ...provided.draggableProps.style,
                      })}
                    >
                      <Box {...provided.dragHandleProps}>
                        <IconGridDots size={16} />
                      </Box>
                      <Box sx={{ flexGrow: 1 }}>
                        <Title order={6}>{item.title}</Title>

                        <Text fz="sm" color="grey">
                          {questionType[item.type]}
                        </Text>
                      </Box>
                      <Text sx={{ whiteSpace: 'nowrap' }} fz="xs" color="grey">
                        (Level {index + 1})
                      </Text>
                    </Flex>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
};

resetServerContext();

export default ListPacks;
