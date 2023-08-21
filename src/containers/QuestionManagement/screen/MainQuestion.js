import { ActionIcon, Box, Divider, Grid, Group, Input, Paper, Title } from '@mantine/core';
import React, { useState } from 'react';
import { Raleway_Dots } from 'next/font/google'
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import ListPacks from '../element/ListPacks';

// If loading a variable font, you don't need to specify the font weight
const dots = Raleway_Dots({ subsets: ['latin'], weight: ['400'] })

const MainQuestion = () => {
  const [val, setVal] = useState("")
  const [active, setActive] = useState()

  return (
    <>
      <Group position='apart' mb={32}>
        <Breadcrumbs data={[{ label: 'Question Management' }]} />
      </Group>
      <Paper radius={0} withBorder>
        <Grid>
          <Grid.Col span={4}>
            <Box p={16} sx={(theme) => ({ borderRight: `1px solid ${theme.colors.gray[3]}`, height: '100%' })}>
              <Group position='apart'>
                <Group spacing={8}>
                  <Title order={4}>Question Pack</Title>
                  {/* <Badge radius="xs">
                    10
                  </Badge> */}
                </Group>
                <ActionIcon variant='outline' color='violet'>
                  <IconPlus size="1.125rem" />
                </ActionIcon>
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
            <Box sx={{ minHeight: 'calc(100vh - 248px)' }}>
            </Box>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  )
}

export default MainQuestion;