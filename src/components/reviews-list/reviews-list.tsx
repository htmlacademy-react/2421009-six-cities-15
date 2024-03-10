import {AuthorizationStatus} from '../../const.ts';

import {Review, Reviews} from '../../types/reviews.ts';

import ReviewsForm from '../reviews-form';
import getAuthorizationStatus, {upperString} from '../../utils/utils.ts';

type ReviewsProps = {
  reviews: Reviews;
}
type ReviewProps = {
  review: Review;
};


const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  return `${upperString(dateObj.toLocaleString('default', { month: 'long' }))} ${dateObj.getFullYear()}`;
};

function ReviewList ({review}: ReviewProps):JSX.Element {

  const ratingStarsStyle = review.rating * 20;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review.user.avatarUrl} width="54" height="54" alt={review.user.name} />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
        <span className="reviews__user-status">{review.user.isPro ? 'Pro' : null}</span>
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

function ReviewsList ({reviews}: ReviewsProps): JSX.Element {

  const reviewsAmount = reviews.length;
  const authorizationStatus = getAuthorizationStatus();

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviewsAmount}</span></h2>
      <ul className="reviews__list">
        {
          reviews.map((review: Review) => (
            <ReviewList key={review.date} review={review} />
          ))
        }
      </ul>
      {
        authorizationStatus === AuthorizationStatus.Auth ?
          <ReviewsForm />
          : null
      }
    </>
  );
}

export default ReviewsList;
