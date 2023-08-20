import { Badge, Box, Button, Divider, Grid, Group, Input, Paper, ScrollArea, Text, Title } from '@mantine/core';
import React, { useState } from 'react';
import { Raleway_Dots } from 'next/font/google'
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { IconChevronRight, IconGridDots, IconPlus, IconSearch } from '@tabler/icons-react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import ListPacks from '../element/ListPacks';

// If loading a variable font, you don't need to specify the font weight
const dots = Raleway_Dots({ subsets: ['latin'], weight: ['400'] })

const MainQuestion = () => {
  const [val, setVal] = useState("")
  const [active, setActive] = useState()

  return (
    <>
      <Group position='apart'>
        <Breadcrumbs data={[{ label: 'Question Management' }]} />
        <Button leftIcon={<IconPlus />}>Add Question Pack</Button>
      </Group>
      <Divider my={32} />
      <Paper radius={0} withBorder>
        <Grid>
          <Grid.Col span={4}>
            <Box p={16} sx={(theme) => ({ borderRight: `1px solid ${theme.colors.gray[3]}`, height: '100%' })}>
              <Group position='apart'>
                <Title order={4}>Question Pack</Title>
                <Badge size='xl'>
                  10
                </Badge>
              </Group>
              <Divider my={16} />
              <Input
                icon={<IconSearch size="1rem" />}
                placeholder="Search pack"
              />
              <Box mt={16}>
                <ListPacks />
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col span={8}>
            <Box sx={{minHeight: 'calc(100vh - 248px)'}}></Box>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  )
}

export default MainQuestion;