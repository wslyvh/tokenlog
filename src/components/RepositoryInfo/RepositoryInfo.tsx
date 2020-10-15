import React, { useEffect, useState } from 'react';
import IssueService from 'services/IssueService';
import { Repository } from 'types/Repository';

interface RepositoryInfoProps {
  organization: string;
  repository: string;
}

export function RepositoryInfo(props: RepositoryInfoProps) {
  const [repository, setRepository] = useState<Repository>();

  useEffect(() => {
    async function asyncEffect() {
      const data = await IssueService.GetRepository(props.organization, props.repository);

      setRepository(data);
    }

    asyncEffect();
  }, [props]);

  if (!repository) {
    return <></>;
  }

  return <div>{repository.description}</div>;
}