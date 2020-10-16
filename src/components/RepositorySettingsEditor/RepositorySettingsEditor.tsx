import React, { useEffect, useState } from 'react';
import IssueService from 'services/IssueService';
import { Label } from 'types/Label';
import { RepositorySettings } from 'types/RepositorySettings';

interface RepositorySettingsEditorProps {
  organization: string;
  repository: string;
}

export function RepositorySettingsEditor(props: RepositorySettingsEditorProps) {
  const [labels, setLabels] = useState<Array<Label>>([]);
  const [repositorySettings, setRepositorySettings] = useState<RepositorySettings>({
    org: props.organization,
    repo: props.repository,
    tokenAddress: '',
    labels: [],
  });

  useEffect(() => {
    async function getRepository() {
      const labels = await IssueService.GetRepositoryLabels(props.organization, props.repository);
      let settings = await IssueService.GetRepositorySettings(props.organization, props.repository);

      if (settings) {
        setRepositorySettings(settings);
      }
      setLabels(labels);
    }

    getRepository();
  }, [props]);

  function onChange(type: string, value: any) {
    if (type === 'tokenAddress') {
      setRepositorySettings({
        org: props.organization,
        repo: props.repository,
        tokenAddress: value,
        labels: repositorySettings.labels,
      });
    }
    if (type === 'labels') {
      setRepositorySettings({
        org: props.organization,
        repo: props.repository,
        tokenAddress: repositorySettings.tokenAddress,
        labels: value,
      });
    }
  }

  return (
    <div>
      <h4>Configure {props.repository}</h4>
      <div className="form-group">
        <label htmlFor="org">Organisation</label>
        <input type="text" className="form-control" id="org" value={repositorySettings.org} disabled />
      </div>

      <div className="form-group">
        <label htmlFor="org">Repository</label>
        <input type="text" className="form-control" id="repo" value={repositorySettings.repo} disabled />
      </div>

      <div className="form-group">
        <label htmlFor="tokenAddress">Token address</label>
        <input
          type="text"
          className="form-control"
          id="tokenAddress"
          placeholder="0x6b175474e89094c44da98b954eedeac495271d0f"
          value={repositorySettings.tokenAddress}
          onChange={(e) => onChange('tokenAddress', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="labels">Labels</label>
        <select 
          value={repositorySettings.labels}
          multiple
          size={10}
          className="form-control"
          id="labels"
          onChange={(e) =>
            onChange(
              'labels',
              Array.from(e.target.selectedOptions, (option: any) => option.value)
            )
          }
        >
          {labels.map((i: Label) => {
            return <option key={i.name}>{i.name}</option>;
          })}
        </select>
      </div>

      <div>
        <p>
          Commmit the following configuration to the root of the repo as <samp>tokenlog.json</samp>.
        </p>
        <div className="jumbotron p-3">
          <code>{JSON.stringify(repositorySettings)}</code>
        </div>
      </div>
    </div>
  );
}
