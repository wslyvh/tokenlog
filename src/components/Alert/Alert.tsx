import React from 'react';

export interface AlertProps {
  type: 'danger' | 'warning' | 'success' | 'info';
  message: string;
}

export const Alert = (props: AlertProps) => {
  if (!props.message) return <></>;

  return (
    <div className={`alert alert-${props.type}`} role="alert">
      {props.message}
    </div>
  );
};
