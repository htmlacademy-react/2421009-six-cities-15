import {Review} from '../../types/reviews.ts';
import {memo} from 'react';
import {RATING_MULTIPLIER} from '../../const.ts';
import formatDate from './utils.ts';

type ReviewProps = {
  review: Review;
};

function ReviewList ({review}: ReviewProps):JSX.Element {

  const ratingStarsStyle = review.rating * RATING_MULTIPLIER;

  return (
    <li className="reviews__item" data-testid="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt={review.user.name} />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
        <span className="reviews__user-status">{review.user.isPro && 'Pro'}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{'width': `${ratingStarsStyle}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review.comment}</p>
        <time className="reviews__time" dateTime={formatDate(review.date)}>{formatDate(review.date)}</time>
      </div>
    </li>
  );
}

const MemorizedReviewList = memo(ReviewList);

export default MemorizedReviewList;
