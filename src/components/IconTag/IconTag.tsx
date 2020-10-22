import React from 'react';

interface IconTagProps {
  icon:
    | 'fas fa-chevron-up'
    | 'far fa-comments'
    | 'far fa-star'
    | 'fas fa-history'
    | 'far fa-eye'
    | 'fas fa-code-branch'
    | 'fas fa-exclamation';
  text?: string;
}

export function IconTag(props: IconTagProps) {
  return (
    <span>
      <span className={props.icon}></span> {props.text}
    </span>
  );
}
