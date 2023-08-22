import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { Box, Button, Center, Checkbox, Divider, Flex, Grid, Group, Image, Input, Paper, Radio, Stack, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import validate from '../utils/validate';
import imageDot from '@/assets/dot.png';
import imageEmptyData from '@/assets/empty-data.svg';
import { IconGridDots, IconPlus, IconTrash } from '@tabler/icons-react';
import States from '@/components/atoms/States';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import useWindowSize from '@/utils/hooks/useWindowSize';
import DottedPreview from '@/components/atoms/DottedPreview';

const CreateQuestion = () => {
  const isMobile = useWindowSize({ type: 'max', limit: 'md' });

  const form = useForm({
    initialValues: {
      item: [
        {
          question: ''
        }
      ]
    },
    validate: validate,
    validateInputOnChange: true
  });

  const onSubmit = (val) => {
    console.log(val)
  }

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Group mb={32} position='apart'>
        <Breadcrumbs
          data={[
            { label: 'Question Management', href: '/question' },
            { label: 'Create' }
          ]}
        />
        <Button type='submit'>Submit</Button>
      </Group>
      <Paper radius={0} withBorder>
        <Grid>
          <Grid.Col span={isMobile ? 12 : 6}>
            <Stack
              sx={(theme) => ({
                borderRight: isMobile ? 'none' : `1px solid ${theme.colors.gray[3]}`,
              })}
              h="100%"
              p={32}
              spacing={16}
            >
              <Title order={4}>Information</Title>
              <Divider />
              <TextInput
                withAsterisk
                label="Judul Question"
                // placeholder="Alfabet Bergaris Huruf A-E"
                {...form.getInputProps('title')}
              />
              <Radio.Group
                label="Pilih Tipe Question"
                withAsterisk
                {...form.getInputProps('type')}
              >
                <Stack mt="xs">
                  <Radio
                    value="dot"
                    label={(
                      <Flex
                        display="block"
                        h={isMobile ? 280 : 200}
                        mb={16}
                        gap={16}
                        align={isMobile ? "start" : "center"}
                        direction={isMobile ? 'column' : 'row'}
                      >
                        <Paper withBorder>
                          <Image height={200} width={200} radius="md" src={imageDot.src} alt="Question Dot" withPlaceholder />
                        </Paper>
                        <Box>
                          <Title order={5}>Huruf Bergaris</Title>
                          <Text>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                          </Text>
                        </Box>
                      </Flex>
                    )}
                  />
                </Stack>
              </Radio.Group>
            </Stack>
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 6}>
            <Stack
              spacing={16}
              p={32}
              sx={(theme) => ({
                borderTop: isMobile ? `1px solid ${theme.colors.gray[3]}` : 'none'
              })}
            >
              <Title order={4}>Question Item</Title>
              <Divider />
              {!form.values.type ? (
                <States
                  image={imageEmptyData.src}
                  message="Tipe Question Kosong"
                  description="Mohon untuk mengisi tipe question dahulu. Sehingga bisa lanjut mengisi question item"
                />
              ) : (
                <>
                  <DragDropContext
                    onDragEnd={({ destination, source }) =>
                      form.reorderListItem('item', { from: source.index, to: destination.index })
                    }
                  >
                    <Droppable droppableId="dnd-list" direction="vertical">
                      {(provided) => (
                        <Box {...provided.droppableProps} ref={provided.innerRef}>
                          {form.values.item.map((_, index) => (
                            <Draggable key={index} index={index} draggableId={index.toString()}>
                              {(provided) => (
                                <Paper withBorder mt={16} p={16} key={index} ref={provided.innerRef} {...provided.draggableProps}>
                                  <Group position='apart' sx={{ minHeight: 30 }}>
                                    <Center {...provided.dragHandleProps}>
                                      <IconGridDots size={16} />
                                    </Center>
                                    <Title sx={{ flexGrow: 1 }} order={6}>Nomor {index + 1}</Title>
                                    {form.values.item.length > 1 && (
                                      <Button
                                        size='xs'
                                        color='red'
                                        variant='subtle'
                                        leftIcon={<IconTrash size={16} />}
                                        onClick={() => form.removeListItem('item', index)}
                                      >
                                        Delete
                                      </Button>
                                    )}
                                  </Group>
                                  <Divider my={8} />
                                  <TextInput
                                    withAsterisk
                                    label="Pertanyaan"
                                    maxLength={10}
                                    {...form.getInputProps(`item.${index}.question`)}
                                  />
                                  <Input.Wrapper label="Preview" mt={16}>
                                    <DottedPreview content={form.values.item[index].question} />
                                  </Input.Wrapper>
                                </Paper>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </Box>
                      )}
                    </Droppable>
                  </DragDropContext>
                  {form.values.item?.length < 10 && (
                    <Center>
                      <Button
                        size='xs'
                        color='green'
                        variant='subtle'
                        leftIcon={<IconPlus size={16} />}
                        onClick={() => form.insertListItem('item', { question: '' })}
                      >
                        Add Question Item
                      </Button>
                    </Center>
                  )}
                </>
              )}
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </form>
  )
}

export default CreateQuestion