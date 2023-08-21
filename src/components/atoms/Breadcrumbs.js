import React from 'react';
import { Anchor, Box, Breadcrumbs as BaseBreadcrumbs, Title } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';

const Breadcrumbs = ({ data = [] }) => {
  return (
    <BaseBreadcrumbs
      separator={(
        <Box component='span' pt="4px">
          <IconChevronRight size={20} />
        </Box>
      )}
    >
      {data.map(({ label, href }, index) => {
        if (href) {
          return (
            <Anchor key={href} color='grey' href={'/'}>
              <Title weight={"normal"} order={3}>
                {label}
              </Title>
            </Anchor>
          )
        } else {
          return (
            <Title key={label} color='violet' order={3}>
              {label}
            </Title>
          )
        }
      })}
    </BaseBreadcrumbs>
  )
}

export default Breadcrumbs;