import React from 'react';
import { Owner } from 'types/Owner';

interface AssigneeBadgesProps {
  assignees: Owner[];
  size?: number;
  showNames?: boolean;
}

export function AssigneeBadges(props: AssigneeBadgesProps) {
  const size = props.size ?? 21;

  return (
    <ul className="list-inline">
      {props.assignees.map((i) => {
        return (
          <li className="list-inline-item">
            <img
              key={i.id}
              className="rounded mr-2"
              style={{ maxWidth: size, maxHeight: size }}
              src={i.avatarUrl}
              alt={i.name}
            />
            {props.showNames && <small>{i.name}</small>}
          </li>
        );
      })}
    </ul>
  );
}
