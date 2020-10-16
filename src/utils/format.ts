import moment from 'moment';

export function TimeFromNow(date: Date): string {
  return moment(date).fromNow();
}
