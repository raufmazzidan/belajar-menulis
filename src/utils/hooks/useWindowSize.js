import { useMediaQuery } from "@mantine/hooks";

const useWindowSize = ({ type, limit }) => {
  const breakpoints = {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  };

  return useMediaQuery(`(${type}-width: ${breakpoints[limit]})`);
}

export default useWindowSize;