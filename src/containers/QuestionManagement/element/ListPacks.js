import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';
import { IconGridDots } from '@tabler/icons-react';
import { Box, Flex, Text, Title } from '@mantine/core';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ListPacks = ({ data, setData, active, setActive }) => {
  const onDragEnd = (result) => {
    // dropped outside the list
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
                      onClick={() => setActive(item)}
                      sx={(theme) => ({
                        background: snapshot.isDragging
                          ? theme.colors.gray[0]
                          : item.id === active.id
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
                          {item.type}
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
