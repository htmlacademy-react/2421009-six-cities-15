import MemorizedOfferGoodsList from './offer-goods-list.tsx';
import { render, screen } from '@testing-library/react';
import {lorem} from 'faker';

describe('Component: MemorizedOfferGoodsList', () => {
  const goods: string[] = [lorem.word()];

  it('should render correctly', () => {
    const preparedComponent = <MemorizedOfferGoodsList goods={goods} />;

    render(preparedComponent);

    expect(screen.getByTestId('offer__inside')).toBeInTheDocument();
  });
});
