import React from 'react';

const LoadedComponent = () => {
  return (
    <div>
      <h1>I was loaded dynamically</h1>
    </div>
  );
};

export default LoadedComponent;

export const NamedExport = () => {
  return (
    <div>
      <h2>Me too! (not a default export)</h2>
    </div>
  );
};
