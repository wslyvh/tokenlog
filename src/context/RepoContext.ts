import { createContext, useContext } from 'react';
import { Repository } from 'types/Repository';
import { RepositorySettings } from 'types/RepositorySettings';

export const DefaultRepoContext = {
  org: '',
  repo: '',
  repository: undefined,
  settings: undefined,
  userBalance: 0,
  setContext: () => {},
};

export interface IRepositoryContext {
  org: string;
  repo: string;
  repository: Repository | undefined;
  settings: RepositorySettings | undefined;
  userBalance: number;
}

export interface RepoContextType {
  org: string;
  repo: string;
  repository: Repository | undefined;
  settings: RepositorySettings | undefined;
  userBalance: number;
  setContext: (context: IRepositoryContext) => void;
}

export const useRepositoryContext = () => useContext(RepoContext);

export const RepoContext = createContext<RepoContextType>(DefaultRepoContext);
