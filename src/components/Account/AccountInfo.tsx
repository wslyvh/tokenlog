import makeBlockie from 'ethereum-blockies-base64';
import React from 'react';

interface AccountInfoProps {
  address: string;
}

export const AccountInfo = (props: AccountInfoProps) => {
  return (
    <div>
      <small className="mr-2 text-muted">{props.address}</small>
      <img
        className="rounded"
        style={{ maxWidth: 21, maxHeight: 21 }}
        src={makeBlockie(props.address)}
        alt={props.address}
      />
    </div>
  );
};
