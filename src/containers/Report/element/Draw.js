import { Box } from '@mantine/core';
import { useResizeObserver } from '@mantine/hooks';
import React, { useEffect, useRef } from 'react';
import { ReactSketchCanvas } from 'react-sketch-canvas';

const Draw = ({ points = [] }) => {
  const [parentRef, parent] = useResizeObserver();
  const ref = useRef();

  const parentWidth = parent.width;

  const onChangeDraw = async () => {
    console.log(parentWidth / 10);
    await ref.current.clearCanvas();
    await ref.current.loadPaths([
      {
        drawMode: true,
        strokeColor: '#000000',
        strokeWidth: 1,
        paths: points.map(({ x, y }) => ({
          x: x / 8 + parentWidth / 2 - 62,
          y: y / 8 + 16,
        })),
      },
    ]);
  };

  useEffect(() => {
    onChangeDraw();
  }, [points, parentWidth]);

  return (
    <Box w="100%" ref={parentRef}>
      <ReactSketchCanvas
        style={{
          border: 'none',
        }}
        allowOnlyPointerType=""
        canvasColor="transparent"
        height="72px"
        ref={ref}
      />
    </Box>
  );
};

export default Draw;
