import {memo} from 'react';

function Loading (): JSX.Element {
  return (
    <div data-testid="lds-roller" className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

const MemorizedLoading = memo(Loading);

export default MemorizedLoading;
