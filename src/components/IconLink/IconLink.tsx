import React from 'react';
import { Link } from 'react-router-dom';

interface IconLinkProps {
  url: string;
  external?: boolean;
  icon: 'fab fa-github' | 'fas fa-cog';
}

export function IconLink(props: IconLinkProps) {
  return props.external ? (
    <a href={props.url} target="_blank" rel="noopener noreferrer">
      <span className={props.icon}></span>
    </a>
  ) : (
    <Link to={props.url}>
      <span className={props.icon}></span>
    </Link>
  );
}
