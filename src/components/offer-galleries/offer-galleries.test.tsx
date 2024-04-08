import MemorizedOfferGalleries from './offer-galleries.tsx';
import { render, screen } from '@testing-library/react';
import {image, lorem} from 'faker';

describe('Component: MemorizedOfferGalleries', () => {
  const title = lorem.paragraph();
  const images: string[] = [image.imageUrl()];

  it('should render correctly', () => {
    const preparedComponent = <MemorizedOfferGalleries images={images} title={title} />;

    render(preparedComponent);

    expect(screen.getByTestId('offer__gallery')).toBeInTheDocument();
  });
});
