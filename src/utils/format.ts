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

export function LanguageColor(type: string): string {
  switch (type) {
    case 'Python':
      return '#3572A5';
    case 'JavaScript':
      return '#f1e05a';
    case 'C++':
      return '#f34b7d';
    case 'HTML':
      return '#e34c26';
    case 'CSS':
      return '#563d7c';
    case 'Go':
      return '#00ADD8';
    case 'Solidity':
      return '#AA6746';
    case 'Clojure':
      return '#db5855';
    case 'Haskell':
      return '#5e5086';
    case 'Java':
      return '#b07219';
    case 'Kotlin':
      return '#f18e33';
    case 'Nim':
      return '#37775b';
    case 'PHP':
      return '#4F5D95';
    case 'Ruby':
      return '#701516';
    case 'Scala':
      return '#c22d40';
    case 'TypeScript':
      return '#2b7489';
    case 'Shell':
      return '#89e051';
    case 'Elixir':
      return '#6e4a7e';
    case 'Rust':
      return '#dea584';
    case 'Swift':
      return '#ffac45';
    case 'Objective-C':
      return '#438eff';
    case 'C':
      return '#555555';
    case 'C#':
      return '#178600';
    case 'PowerShell':
      return '#012456';
    case 'YAML':
      return '#cb171e';
    case 'Vue':
      return '#2c3e50';
  }

  return '#ccc';
}

export function ShortenAddress(address: string, substring: number = 5): string {
  if (!address) return '';

  const begin = address.substring(0, substring + 2);
  const end = address.substring(address.length - substring, address.length);
  const formatted = `${begin}...${end}`;

  return formatted;
}

export function Percentage(share: number, total: number, precision: number = 2) {
  return ((share / total) * 100).toFixed(precision);
}
