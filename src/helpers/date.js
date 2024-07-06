import { formatDistanceToNow } from 'date-fns';
import viLocale from 'date-fns/locale/vi';

export const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: viLocale,
  });
};
