import React from 'react';

export const BetaBanner = () => {
  return (
    <div className="alert-info beta-banner" role="alert">
      <span role="img" aria-label="beta" className="mr-2">
        🧪
      </span>
      Beta version. Join us at <a href="https://github.com/wslyvh/tokenlog">Github</a> to contribute.
    </div>
  );
};
