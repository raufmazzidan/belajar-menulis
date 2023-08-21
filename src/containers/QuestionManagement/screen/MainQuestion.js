import { ActionIcon, Box, Divider, Grid, Group, Input, Paper, Title } from '@mantine/core';
import React from 'react';
import { Raleway_Dots } from 'next/font/google'
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import ListPacks from '../element/ListPacks';
import Link from 'next/link';
import States from '@/components/atoms/States';
import imageEmptyData from '@/assets/empty-data.svg';
import useWindowSize from '@/utils/hooks/useWindowSize';

// If loading a variable font, you don't need to specify the font weight
const dots = Raleway_Dots({ subsets: ['latin'], weight: ['400'] })

const MainQuestion = () => {

  const isMobile = useWindowSize({ type: 'max', limit: 'md' });

  return (
    <>
      <Box mb={32}>
        <Breadcrumbs data={[{ label: 'Question Management' }]} />
      </Box>
      <Paper radius={0} withBorder>
        <Grid>
          <Grid.Col span={isMobile ? 12 : 5}>
            <Box
              px={32}
              pb={32}
              sx={(theme) => ({
                borderRight: isMobile ? 'none' : `1px solid ${theme.colors.gray[3]}`,
                height: '100%',
                maxHeight: isMobile ? "70vh" : "100%",
                overflow: 'auto',
                position: 'relative'
              })}
            >
              <Box sx={{ position: 'sticky', top: 0, background: 'white', }} pt={32} pb={16}>
                <Group position='apart'>
                  <Group spacing={8}>
                    <Title order={4}>Question Pack</Title>
                    {/* <Badge radius="xs">
                    10
                  </Badge> */}
                  </Group>
                  <ActionIcon variant='outline' color='violet' component={Link} href="/question/create">
                    <IconPlus size="1.125rem" />
                  </ActionIcon>
                </Group>
                <Divider my={16} />
                <Input
                  icon={<IconSearch size="1rem" />}
                  placeholder="Search pack"
                />
              </Box>
              <Box>
                <ListPacks />
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col
            span={isMobile ? 12 : 7}
            sx={(theme) => ({
              borderTop: isMobile ? `1px solid ${theme.colors.gray[3]}` : 'none'
            })}
          >
            <Box sx={{ minHeight: 'calc(100vh - 248px)', paddingTop: 80 }}>
              <States
                image={imageEmptyData.src}
                message="Data Not Found"
                description="Tidak ada hasil yang sesuai dengan permintaan Anda"
              />
            </Box>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  )
}

export default MainQuestion;