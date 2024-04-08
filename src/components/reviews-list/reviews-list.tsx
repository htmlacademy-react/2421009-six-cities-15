import {Review, ReviewsType} from '../../types/reviews.ts';

import MemorizedReviewList from '../review-list';
import {memo} from 'react';
import {MaxCountLimit} from '../../const.ts';

type ReviewsProps = {
  reviews: ReviewsType;
}

function ReviewsList ({reviews}: ReviewsProps) {

  const reviewsLimit = reviews !== undefined ? reviews.slice(0, MaxCountLimit.Comments) : [];
  const reviewsCount = reviewsLimit.length;

  return (
    reviewsCount > 0 && (
      <ul className="reviews__list" data-testid="reviews__list">
        {
          reviewsLimit.map((review: Review) => (
            <MemorizedReviewList key={review.id} review={review} />
          ))
        }
      </ul>
    )
  );
}

const MemorizedReviewsList = memo(ReviewsList);

export default MemorizedReviewsList;
