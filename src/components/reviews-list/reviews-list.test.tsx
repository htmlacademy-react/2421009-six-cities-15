import MemorizedReviewsList from './reviews-list.tsx';
import { render, screen } from '@testing-library/react';
import {ReviewsType} from '../../types/reviews.ts';
import {makeFakeReview} from '../../utils/mocks.ts';

describe('Component: MemorizedReviewsList', () => {
  const reviews: ReviewsType = [makeFakeReview()];

  it('should render correctly', () => {
    const preparedComponent = <MemorizedReviewsList reviews={reviews} />;

    render(preparedComponent);

    expect(screen.getByTestId('reviews__list')).toBeInTheDocument();
  });
});
