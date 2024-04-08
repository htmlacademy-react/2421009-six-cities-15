import {getUpperString} from '../../utils/utils.ts';

const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  return `${getUpperString(dateObj.toLocaleString('en-US', { month: 'long' }))} ${dateObj.getFullYear()}`;
};

export default formatDate;
