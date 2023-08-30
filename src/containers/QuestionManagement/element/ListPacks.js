import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';
import { IconGridDots } from '@tabler/icons-react';
import { Box, Flex, Text, Title } from '@mantine/core';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useRouter } from 'next/router';
import { questionType } from '../utils/constant';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ListPacks = ({ data, setData }) => {
  const router = useRouter();
  const onSort = async (datas) => {
    try {
      await datas.forEach(async (data, index) => {
        const ref = doc(db, 'question', data.id);
        await updateDoc(ref, { level: index + 1 });
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
