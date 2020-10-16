import moment from 'moment';
import { IssueType } from 'types/Issue';

export function TimeFromNow(date: Date): string {
  return moment(date).fromNow();
}

export function IssueColor(type: IssueType): string {
  switch (type) {
    case IssueType.ISSUE:
      return '#28a745';
    case IssueType.PR:
      return '#6f42c1';
  }
}

export function ShortenAddress(address: string, substring: number = 5): string { 
  const begin = address.substring(0, substring);
  const end = address.substring(address.length - substring, address.length);
  const formatted = `${begin}...${end}`;

  return formatted;
}
