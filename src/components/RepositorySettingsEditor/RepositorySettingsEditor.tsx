import React, { useEffect, useState } from 'react';
import IssueService from 'services/IssueService';
import { Label } from 'types/Label';
import { Repository } from 'types/Repository';

interface RepositorySettingsEditorProps {
  organization: string;
  repository: string;
}

export function RepositorySettingsEditor(props: RepositorySettingsEditorProps) {
  const [repository, setRepository] = useState<Repository>();
  const [labels, setLabels] = useState<Array<Label>>([]);

  useEffect(() => {
    async function getRepository() {
      const repo = await IssueService.GetRepository(props.organization, props.repository);
      const labels = await IssueService.GetRepositoryLabels(props.organization, props.repository);

      setRepository(repo);
      setLabels(labels);
    }

    getRepository();
  }, [props]);

  function handleSubmit(e: any) {
    e.preventDefault();
    console.log('Submitting form..');
  }

  if (!repository) {
    return <></>;
  }

  return (
    <div>
      <h4>Configure {repository.name}</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="org">Organisation</label>
          <input type="text" className="form-control" id="org" value={props.organization} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="org">Repository</label>
          <input type="text" className="form-control" id="repo" value={props.repository} disabled />
        </div>

        <div className="form-group">
          <label htmlFor="tokenAddress">Token address</label>
          <input
            type="text"
            className="form-control"
            id="tokenAddress"
            placeholder="0x6b175474e89094c44da98b954eedeac495271d0f"
          />
        </div>

        <div className="form-group">
          <label htmlFor="labels">Example multiple select</label>
          <select multiple size={10} className="form-control" id="labels">
            {labels.map((i: Label) => {
              return <option key={i.id}>{i.name}</option>;
            })}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}
