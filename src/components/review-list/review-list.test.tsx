import MemorizedReviewList from './review-list.tsx';
import { render, screen } from '@testing-library/react';
import {Review} from '../../types/reviews.ts';
import {makeFakeReview} from '../../utils/mocks.ts';

describe('Component: MemorizedReviewList', () => {
  const review: Review = makeFakeReview();

  it('should render correctly', () => {
    const preparedComponent = <MemorizedReviewList review={review} />;

    render(preparedComponent);

    expect(screen.getByTestId('reviews__item')).toBeInTheDocument();
  });
});
