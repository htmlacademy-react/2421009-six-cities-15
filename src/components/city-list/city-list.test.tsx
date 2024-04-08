import MemorizedCityList from './city-list.tsx';
import { render, screen } from '@testing-library/react';
import {DEFAULT_CITY} from '../../const.ts';
import {withHistory} from '../../utils/mock-component.tsx';
import {createMemoryHistory, MemoryHistory} from 'history';

describe('Component: MemorizedCityList', () => {
  let mockHistory: MemoryHistory;
  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const preparedComponent = withHistory(<MemorizedCityList city={DEFAULT_CITY} />, mockHistory);

    render(preparedComponent);

    expect(screen.getByTestId('locations__item')).toBeInTheDocument();
  });
});
