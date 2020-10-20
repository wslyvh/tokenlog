import { createContext, useContext } from 'react';
import { Repository } from 'types/Repository';
import { RepositorySettings } from 'types/RepositorySettings';

export const DefaultRepoContext = {
  org: '',
  repo: '',
  repository: undefined,
  settings: undefined,
  setContext: () => {},
};

export interface IRepositoryContext {
  org: string;
  repo: string;
  repository: Repository | undefined;
  settings: RepositorySettings | undefined;
}

export interface RepoContextType {
  org: string;
  repo: string;
  repository: Repository | undefined;
  settings: RepositorySettings | undefined;
  setContext: (context: IRepositoryContext) => void;
}

export const useRepositoryContext = () => useContext(RepoContext);

export const RepoContext = createContext<RepoContextType>(DefaultRepoContext);
