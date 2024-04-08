import {createMemoryHistory, MemoryHistory} from 'history';
import { render, screen } from '@testing-library/react';
import MemorizedCitiesList from './cities-list.tsx';
import {withHistory} from '../../utils/mock-component.tsx';

describe('Component: MemorizedCitiesList', () => {

  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const preparedComponent = withHistory(<MemorizedCitiesList />, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId('locations__list')).toBeInTheDocument();
  });
});


