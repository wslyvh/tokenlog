import React from 'react';
import { Label } from 'types/Label';

interface LabelBadgesProps {
  labels: Label[];
}

export function LabelBadges(props: LabelBadgesProps) {
  return (
    <ul className="list-inline my-2">
      {props.labels.map((i) => {
        return (
          <li key={i.id} className="list-inline-item">
            <span key={i.id} className="badge" style={{ backgroundColor: '#' + i.color }}>
              {i.name}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
