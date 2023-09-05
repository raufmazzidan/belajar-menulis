import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import { Button, Divider, Grid, Group, Input, Paper, PinInput, Stack, TextInput, Title } from '@mantine/core';
import React from 'react';
import useFormMentee from '../hooks/useFormMentee';

const FormMentee = () => {
  const { form, isEdit, isMobile, onSubmit } = useFormMentee();

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Group mb={32} position="apart">
        <Breadcrumbs data={[{ label: 'Mentee Management', href: '/mentee' }, { label: isEdit ? 'Edit' : 'Create' }]} />
        <Button type="submit">Submit</Button>
      </Group>
      <Paper radius={0} withBorder>
        <Grid>
          <Grid.Col xs={12} lg={6}>
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
              <TextInput withAsterisk label="Nama Lengkap" {...form.getInputProps('fullName')} />
              <TextInput withAsterisk label="Email" {...form.getInputProps('email')} />
              <Input.Wrapper label="PIN" withAsterisk {...form.getInputProps('password')}>
                <PinInput type="number" length={6} {...form.getInputProps('password')} />
              </Input.Wrapper>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </form>
  );
};

export default FormMentee;
