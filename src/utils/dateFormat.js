import { format } from 'date-fns';

const dateFormat = ({ date, format: pattern }) => {
  try {
    const res = format(new Date(date), pattern);
    return res;
  } catch (error) {
    return '-';
  }
};

export default dateFormat;
