import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable, resetServerContext } from "react-beautiful-dnd";
import { IconGridDots } from "@tabler/icons-react";
import { Box, Flex, Text, Title } from "@mantine/core";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ListPacks = () => {
  const [data, setData] = useState([
    {
      id: '1a',
      title: 'Huruf Kecil [a-m]',
      type: 'dottedAlphabet',
      lastUpdate: '11/11/1111'
    },
    {
      id: '2s',
      title: 'Huruf Kecil [n-z]',
      type: 'dottedAlphabet',
      lastUpdate: '11/11/1111'
    },
    {
      id: 'd3',
      title: 'Huruf Kecil [n-z]',
      type: 'dottedAlphabet',
      lastUpdate: '11/11/1111'
    },
    {
      id: 'f4',
      title: 'Huruf Kecil [n-z]',
      type: 'dottedAlphabet',
      lastUpdate: '11/11/1111'
    },
  ])

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      data,
      result.source.index,
      result.destination.index
    );

    setData(items)
  }

  const [active, setActive] = useState()

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="packs">
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {data.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      onClick={() => setActive(index)}
                      sx={(theme) => ({
                        background: snapshot.isDragging ? theme.colors.gray[0] : index === active ? theme.colors.violet[0] : 'white',
                        padding: 16,
                        '&:hover': {
                          background: theme.colors.gray[1]
                        },
                        userSelect: 'none',
                        cursor: 'pointer',
                        ...provided.draggableProps.style
                      })}

                    >
                      <Flex gap={16} align="center">
                        <Box {...provided.dragHandleProps}>
                          <IconGridDots size={16} />
                        </Box>
                        <Box>
                          <Title order={6}>
                            {item.title}
                            <Text component="span" fz="xs" ml={8} weight="lighter" color='grey'>(Level {index + 1})</Text>
                          </Title>

                          <Text fz="sm" color='grey'>Dotted Alphabet</Text>
                        </Box>
                        {/* <Text fz="xs" color='grey'>11/12/2023 <br/> 11:11</Text> */}
                      </Flex>
                    </Box>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  )
}

resetServerContext();

export default ListPacks