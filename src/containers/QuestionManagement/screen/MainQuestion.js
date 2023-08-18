import { Button, Input, Text } from '@mantine/core';
import React, { useState } from 'react';

import { Raleway_Dots } from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
const dots = Raleway_Dots({ subsets: ['latin'], weight: ['400'] })

const MainQuestion = () => {
  const [val, setVal] = useState("")
  return (
    <>
      <Input
        value={val}
        onChange={({ target: { value } }) => setVal(value)}
      />
      <Text className={dots.className} size={100}>
        {val}
      </Text>
    </>
  )
}

export default MainQuestion;