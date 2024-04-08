import Loading from './loading.tsx';
import { render, screen } from '@testing-library/react';

describe('Component: Loading', () => {
  it('should render correctly', () => {
    const preparedComponent = <Loading />;

    render(preparedComponent);

    expect(screen.getByTestId('lds-roller')).toBeInTheDocument();
  });
});
